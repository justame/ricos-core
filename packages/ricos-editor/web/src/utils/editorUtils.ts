import {
  createWithContent,
  convertToRaw,
  convertFromRaw,
} from 'wix-rich-content-editor/libs/editorStateConversion';
import type { EditorProps, EditorState } from 'draft-js';
import { pick } from 'lodash';
import { v4 as uuid } from 'uuid';
import { DRAFT_EDITOR_PROPS } from 'ricos-common';
import { isContentStateEmpty } from 'ricos-content';
import { isContentEqual } from 'ricos-content/libs/comapareDraftContent';
import type { DraftContent } from 'wix-rich-content-common';
import { isSSR } from 'wix-rich-content-common';
import { getEmptyDraftContent } from 'wix-rich-content-editor-common';
import type { EditorDataInstance, OnContentChangeFunction, ContentStateGetter } from '../index';
import errorBlocksRemover from './errorBlocksRemover';

type onDraftEditorContentChange = (draftContent: DraftContent, editorState: EditorState) => void;

/* eslint-disable no-console */
export const assert = (predicate, message) => console.assert(predicate, message);

export const ONCHANGE_DEBOUNCE_TIME = 200;

const wait = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const enforceContentId = (content?: DraftContent): DraftContent | undefined =>
  content && { ...content, ID: content.ID || uuid() };

type ContentChangeCallbacks = [
  onContentChange: OnContentChangeFunction | undefined,
  onDraftEditorContentChange: onDraftEditorContentChange | undefined
];

export function createDataConverter(
  contentChangeCallbacks: ContentChangeCallbacks,
  initialContent?: DraftContent
): EditorDataInstance {
  const initialOrEmptyContent = enforceContentId(initialContent) || getEmptyDraftContent();

  let currContent = initialOrEmptyContent;
  let lastContent = currContent;
  let currEditorState = createWithContent(convertFromRaw(initialOrEmptyContent));
  let currTraits = {
    isEmpty: isContentStateEmpty(currContent),
    isContentChanged: false,
    isLastChangeEdit: false,
  };
  let isUpdated = false;
  let waitingForUpdatePromise = Promise.resolve(),
    waitingForUpdateResolve;

  const getContentStatePromise = async () => {
    await Promise.race([wait(2000), waitingForUpdatePromise]);
    return getContentState();
  };

  const waitForUpdate = () => {
    waitingForUpdatePromise = new Promise(res => {
      waitingForUpdateResolve = res;
    });
  };

  const getEditorState = () => currEditorState;

  const updateTraits = (
    currContent: DraftContent,
    lastContent: DraftContent,
    initialContent: DraftContent
  ) => {
    const initialContentEqual = isContentEqual(currContent, initialContent);
    const lastContentEqual = isContentEqual(currContent, lastContent);
    currTraits = {
      isEmpty: isContentStateEmpty(currContent),
      isContentChanged: !initialContentEqual,
      isLastChangeEdit: !lastContentEqual,
    };
  };

  const getContentTraits = () => {
    if (!isUpdated) {
      const currState = currEditorState.getCurrentContent();
      lastContent = currContent;
      currContent = convertToRaw(currState);
      updateTraits(currContent, lastContent, initialOrEmptyContent);
      isUpdated = true;
    }
    return currTraits;
  };

  const getContentState: ContentStateGetter = ({ shouldRemoveErrorBlocks = true } = {}) => {
    if (!isUpdated) {
      const currState = currEditorState.getCurrentContent();
      lastContent = currContent;
      currContent = convertToRaw(currState);
      updateTraits(currContent, lastContent, initialOrEmptyContent);
      isUpdated = true;
    }

    const [onContentChange, onDraftEditorContentChange] = contentChangeCallbacks;
    onContentChange?.(currContent);
    onDraftEditorContentChange?.(currContent, currEditorState);

    if (waitingForUpdateResolve) {
      waitingForUpdateResolve();
      waitingForUpdateResolve = false;
      waitingForUpdatePromise = Promise.resolve();
    }
    return shouldRemoveErrorBlocks ? errorBlocksRemover(currContent) : currContent;
  };

  function debounce<A, R>(f: (args?: A) => R, interval: number): (args?: A) => Promise<R> {
    let timer;

    return (...args) => {
      clearTimeout(timer);
      return new Promise((resolve, reject) => {
        timer = setTimeout(() => {
          try {
            resolve(f(...args));
          } catch (err) {
            reject(err);
          }
        }, interval);
      });
    };
  }

  const debounceUpdate = debounce(getContentState, ONCHANGE_DEBOUNCE_TIME);

  return {
    getContentState,
    getContentTraits,
    getEditorState,
    waitForUpdate,
    getContentStatePromise,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    refresh: (editorState, onError) => {
      if (!isSSR()) {
        isUpdated = false;
        currEditorState = editorState;
        debounceUpdate().catch(err => onError?.(err));
      }
    },
  };
}

export const filterDraftEditorSettings = (draftEditorSettings: Partial<EditorProps>) =>
  pick(draftEditorSettings, DRAFT_EDITOR_PROPS);
