/* eslint-disable */
import { PluginContainerData } from './common';

export interface CollapsibleListData {
  containerData?: PluginContainerData;
  expandOnlyOne?: boolean;
  initialExpandedItems: CollapsibleListData_InitialExpandedItems;
  direction: CollapsibleListData_Direction;
}

export const enum CollapsibleListData_InitialExpandedItems {
  FIRST = 0,
  ALL = 1,
  NONE = 2,
  UNRECOGNIZED = -1,
}

export function collapsibleListData_InitialExpandedItemsFromJSON(
  object: any
): CollapsibleListData_InitialExpandedItems {
  switch (object) {
    case 0:
    case 'FIRST':
      return CollapsibleListData_InitialExpandedItems.FIRST;
    case 1:
    case 'ALL':
      return CollapsibleListData_InitialExpandedItems.ALL;
    case 2:
    case 'NONE':
      return CollapsibleListData_InitialExpandedItems.NONE;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return CollapsibleListData_InitialExpandedItems.UNRECOGNIZED;
  }
}

export function collapsibleListData_InitialExpandedItemsToJSON(
  object: CollapsibleListData_InitialExpandedItems
): string {
  switch (object) {
    case CollapsibleListData_InitialExpandedItems.FIRST:
      return 'FIRST';
    case CollapsibleListData_InitialExpandedItems.ALL:
      return 'ALL';
    case CollapsibleListData_InitialExpandedItems.NONE:
      return 'NONE';
    default:
      return 'UNKNOWN';
  }
}

export const enum CollapsibleListData_Direction {
  LTR = 0,
  RTL = 1,
  UNRECOGNIZED = -1,
}

export function collapsibleListData_DirectionFromJSON(object: any): CollapsibleListData_Direction {
  switch (object) {
    case 0:
    case 'LTR':
      return CollapsibleListData_Direction.LTR;
    case 1:
    case 'RTL':
      return CollapsibleListData_Direction.RTL;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return CollapsibleListData_Direction.UNRECOGNIZED;
  }
}

export function collapsibleListData_DirectionToJSON(object: CollapsibleListData_Direction): string {
  switch (object) {
    case CollapsibleListData_Direction.LTR:
      return 'LTR';
    case CollapsibleListData_Direction.RTL:
      return 'RTL';
    default:
      return 'UNKNOWN';
  }
}

const baseCollapsibleListData: object = { initialExpandedItems: 0, direction: 0 };

export const CollapsibleListData = {
  fromJSON(object: any): CollapsibleListData {
    const message = { ...baseCollapsibleListData } as CollapsibleListData;
    if (object.containerData !== undefined && object.containerData !== null) {
      message.containerData = PluginContainerData.fromJSON(object.containerData);
    } else {
      message.containerData = undefined;
    }
    if (object.expandOnlyOne !== undefined && object.expandOnlyOne !== null) {
      message.expandOnlyOne = Boolean(object.expandOnlyOne);
    } else {
      message.expandOnlyOne = undefined;
    }
    if (object.initialExpandedItems !== undefined && object.initialExpandedItems !== null) {
      message.initialExpandedItems = collapsibleListData_InitialExpandedItemsFromJSON(
        object.initialExpandedItems
      );
    } else {
      message.initialExpandedItems = 0;
    }
    if (object.direction !== undefined && object.direction !== null) {
      message.direction = collapsibleListData_DirectionFromJSON(object.direction);
    } else {
      message.direction = 0;
    }
    return message;
  },

  toJSON(message: CollapsibleListData): unknown {
    const obj: any = {};
    message.containerData !== undefined &&
      (obj.containerData = message.containerData
        ? PluginContainerData.toJSON(message.containerData)
        : undefined);
    message.expandOnlyOne !== undefined && (obj.expandOnlyOne = message.expandOnlyOne);
    message.initialExpandedItems !== undefined &&
      (obj.initialExpandedItems = collapsibleListData_InitialExpandedItemsToJSON(
        message.initialExpandedItems
      ));
    message.direction !== undefined &&
      (obj.direction = collapsibleListData_DirectionToJSON(message.direction));
    return obj;
  },
};
