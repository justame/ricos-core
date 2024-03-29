import React from 'react';
import SpoilerViewer from './spoiler-viewer';
import type { SpoilerPluginViewerConfig } from './types';
import { SPOILER_TYPE } from './types';
import type { InlineStyleMapperFunction, InlineStyleMapper } from 'wix-rich-content-common';
import { getBlocksFromContentState } from 'wix-rich-content-common';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StateChangeCallback = (state: Record<string, any>) => void;

export const spoilerInlineStyleMapper: InlineStyleMapperFunction<SpoilerPluginViewerConfig> = (
  config,
  raw = { blocks: [], entityMap: {} }
) => {
  const settings = config[SPOILER_TYPE] || {};
  const rawBlocks = getBlocksFromContentState(raw);
  const mapper = rawBlocks.reduce<InlineStyleMapper>((map, block) => {
    block?.inlineStyleRanges?.forEach((range, idx) => {
      if (range.style === SPOILER_TYPE) {
        const stateChangeCallBacks: StateChangeCallback[] = [];
        const callAllCallbacks: StateChangeCallback = newState =>
          stateChangeCallBacks.forEach(cb => cb(newState));
        const spoilerStyle = `SPOILER_${block.key}_${range.offset}_${range.offset + range.length}`;
        map[spoilerStyle] = (children, { key }) => (
          <SpoilerViewer
            settings={settings}
            dataHook={`spoiler_${idx}`}
            stateChangeCallBacks={stateChangeCallBacks}
            callAllCallbacks={callAllCallbacks}
            children={children}
            key={key}
          />
        );
      }
    });

    return map;
  }, {});
  return () => mapper;
};
