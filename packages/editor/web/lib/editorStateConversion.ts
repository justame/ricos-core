import { EditorState, cloneDeepWithoutEditorState } from 'wix-rich-content-editor-common';
import type { RawDraftEntity, RawDraftContentState } from '@wix/draft-js';
import { convertFromRaw as fromRaw, convertToRaw as toRaw } from '@wix/draft-js';
import { COLLAPSIBLE_LIST_TYPE, TABLE_TYPE, SOUND_CLOUD_TYPE, VIDEO_TYPE } from 'ricos-content';
//@ts-ignore
const version = '1.0.0';
import { v4 as uuid } from 'uuid';

const addVersion = (obj, version: string): typeof obj => {
  obj.VERSION = version;
  return obj;
};

const addID = (obj, id?: string): typeof obj => {
  obj.ID = id;
  return obj;
};

const addMetadata = (obj, version: string, id?: string): typeof obj => {
  let newObj = addVersion(obj, version);
  newObj = addID(obj, id);
  return newObj;
};

const fixBlockDataImmutableJS = contentState => {
  contentState.blocks.forEach(block =>
    Object.keys(block.data).forEach(key => {
      const value = block.data[key];
      if (value.toObject) {
        block.data[key] = value.toObject();
      }
    })
  );
  return contentState;
};

const isCollapsibleList = entity => entity.type === COLLAPSIBLE_LIST_TYPE;
const isTable = entity => entity.type === TABLE_TYPE;
const isOldSoundCloud = entity => entity.type === SOUND_CLOUD_TYPE;

type Pair = {
  key: string;
  title: EditorState;
  content: EditorState;
};

type RawPair = {
  key: string;
  title: RawDraftContentState;
  content: RawDraftContentState;
};

type Row = Record<string, Columns>;
type Columns = Record<string, Cell>;
type Cell = {
  content: EditorState;
};

const isTextAnchor = entity => entity.type === 'LINK' && !!entity.data.anchor;

const isImageAnchor = entity =>
  entity.type === 'wix-draft-plugin-image' && !!entity.data?.config?.link?.anchor;

const entityMapDataFixer = (rawContentState, entityFixers) => {
  const updatedRaw = cloneDeepWithoutEditorState(rawContentState);
  Object.values(updatedRaw.entityMap).forEach((entity: RawDraftEntity) => {
    entityFixers.forEach(({ predicate, entityFixer }) => {
      if (predicate(entity)) {
        entityFixer(entity);
      }
    });
  });
  return updatedRaw;
};

const entityFixersToRaw = [
  {
    predicate: isImageAnchor,
    entityFixer: (entity: RawDraftEntity) => {
      const { link, ...rest } = entity.data.config;
      entity.data.config = {
        anchor: link.anchor,
        ...rest,
      };
    },
  },
  {
    predicate: isTextAnchor,
    entityFixer: entity => {
      entity.type = 'ANCHOR';
    },
  },
  {
    predicate: isCollapsibleList,
    entityFixer: (entity: RawDraftEntity) => {
      const { pairs } = entity.data;
      entity.data.pairs = pairs.map((pair: Pair) => {
        const title = pair.title?.getCurrentContent() || createEmptyContent();
        const content = pair.content?.getCurrentContent() || createEmptyContent();
        return {
          key: pair.key,
          title: toRaw(title),
          content: toRaw(content),
        };
      });
    },
  },
  {
    predicate: isTable,
    entityFixer: (entity: RawDraftEntity) => {
      entity.data.config = convertTableConfigToRaw(entity.data.config);
    },
  },
];

const convertTableConfigToRaw = config => {
  const { rows, ...rest }: { rows: { string: Row } } = config;
  const newRows = {};
  Object.entries(rows).forEach(([rowIndex, row]) => {
    newRows[rowIndex] = {};
    Object.entries(row.columns).forEach(([cellIndex, cell]) => {
      const contentState = cell.content?.getCurrentContent() || createEmptyContent();
      const content = toRaw(contentState);
      newRows[rowIndex].columns = {
        ...newRows[rowIndex].columns,
        [cellIndex]: { ...cell, content },
      };
    });
  });
  return {
    rows: newRows,
    ...rest,
  };
};

const entityFixersFromRaw = [
  {
    predicate: isCollapsibleList,
    entityFixer: (entity: RawDraftEntity) => {
      const { pairs } = entity.data;
      entity.data.pairs = pairs.map((pair: RawPair) => {
        return {
          key: pair.key,
          title: EditorState.createWithContent(convertFromRaw(pair.title)),
          content: EditorState.createWithContent(convertFromRaw(pair.content)),
        };
      });
    },
  },
  {
    predicate: isTable,
    entityFixer: (entity: RawDraftEntity) => {
      const { rows } = entity.data.config;
      Object.entries(rows).forEach(([, row]) => {
        Object.entries((row as Row).columns).forEach(([, column]) => {
          column.content = EditorState.createWithContent(convertFromRaw(column.content));
        });
      });
    },
  },
  {
    predicate: isOldSoundCloud,
    entityFixer: (entity: RawDraftEntity) => {
      entity.type = VIDEO_TYPE;
      entity.data.type = 'soundCloud';
    },
  },
];

const addDocumentStyle = (obj, documentStyle) => {
  documentStyle && (obj.documentStyle = documentStyle);
  return obj;
};

const convertToRaw = ContentState =>
  addMetadata(
    addDocumentStyle(
      fixBlockDataImmutableJS(entityMapDataFixer(toRaw(ContentState), entityFixersToRaw)),
      ContentState.documentStyle
    ),
    version,
    ContentState.ID
  );

const convertFromRaw = rawState =>
  addMetadata(
    addDocumentStyle(
      fromRaw(entityMapDataFixer(rawState, entityFixersFromRaw)),
      rawState.documentStyle
    ),
    rawState.VERSION,
    rawState.ID
  );

const createEmpty = () => addMetadata(EditorState.createEmpty(), version, uuid());
const createEmptyContent = () => createEmpty().getCurrentContent();
const createWithContent = contentState =>
  addMetadata(
    addDocumentStyle(EditorState.createWithContent(contentState), contentState.documentStyle),
    contentState.VERSION,
    contentState.ID
  );

export {
  EditorState,
  createEmpty,
  createWithContent,
  convertToRaw,
  convertFromRaw,
  convertTableConfigToRaw,
};
