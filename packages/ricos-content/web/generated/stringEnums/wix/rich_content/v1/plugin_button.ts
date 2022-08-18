/* eslint-disable */
import { PluginContainerData, Link } from './common';

export interface ButtonData {
  containerData?: PluginContainerData;
  type: ButtonData_Type;
  styles?: ButtonData_Styles;
  text?: string;
  link?: Link;
}

export const enum ButtonData_Type {
  LINK = 'LINK',
  ACTION = 'ACTION',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export function buttonData_TypeFromJSON(object: any): ButtonData_Type {
  switch (object) {
    case 0:
    case 'LINK':
      return ButtonData_Type.LINK;
    case 1:
    case 'ACTION':
      return ButtonData_Type.ACTION;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return ButtonData_Type.UNRECOGNIZED;
  }
}

export function buttonData_TypeToJSON(object: ButtonData_Type): string {
  switch (object) {
    case ButtonData_Type.LINK:
      return 'LINK';
    case ButtonData_Type.ACTION:
      return 'ACTION';
    default:
      return 'UNKNOWN';
  }
}

export interface ButtonData_Styles {
  border?: ButtonData_Styles_Border;
  colors?: ButtonData_Styles_Colors;
}

export interface ButtonData_Styles_Colors {
  /** hex color */
  text?: string;
  /** hex color */
  border?: string;
  /** hex color */
  background?: string;
}

export interface ButtonData_Styles_Border {
  /** number of pixels */
  width?: number;
  /** number of pixels */
  radius?: number;
}

const baseButtonData: object = { type: ButtonData_Type.LINK };

export const ButtonData = {
  fromJSON(object: any): ButtonData {
    const message = { ...baseButtonData } as ButtonData;
    if (object.containerData !== undefined && object.containerData !== null) {
      message.containerData = PluginContainerData.fromJSON(object.containerData);
    } else {
      message.containerData = undefined;
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = buttonData_TypeFromJSON(object.type);
    } else {
      message.type = ButtonData_Type.LINK;
    }
    if (object.styles !== undefined && object.styles !== null) {
      message.styles = ButtonData_Styles.fromJSON(object.styles);
    } else {
      message.styles = undefined;
    }
    if (object.text !== undefined && object.text !== null) {
      message.text = String(object.text);
    } else {
      message.text = undefined;
    }
    if (object.link !== undefined && object.link !== null) {
      message.link = Link.fromJSON(object.link);
    } else {
      message.link = undefined;
    }
    return message;
  },

  toJSON(message: ButtonData): unknown {
    const obj: any = {};
    message.containerData !== undefined &&
      (obj.containerData = message.containerData
        ? PluginContainerData.toJSON(message.containerData)
        : undefined);
    message.type !== undefined && (obj.type = buttonData_TypeToJSON(message.type));
    message.styles !== undefined &&
      (obj.styles = message.styles ? ButtonData_Styles.toJSON(message.styles) : undefined);
    message.text !== undefined && (obj.text = message.text);
    message.link !== undefined && (obj.link = message.link ? Link.toJSON(message.link) : undefined);
    return obj;
  },
};

const baseButtonData_Styles: object = {};

export const ButtonData_Styles = {
  fromJSON(object: any): ButtonData_Styles {
    const message = { ...baseButtonData_Styles } as ButtonData_Styles;
    if (object.border !== undefined && object.border !== null) {
      message.border = ButtonData_Styles_Border.fromJSON(object.border);
    } else {
      message.border = undefined;
    }
    if (object.colors !== undefined && object.colors !== null) {
      message.colors = ButtonData_Styles_Colors.fromJSON(object.colors);
    } else {
      message.colors = undefined;
    }
    return message;
  },

  toJSON(message: ButtonData_Styles): unknown {
    const obj: any = {};
    message.border !== undefined &&
      (obj.border = message.border ? ButtonData_Styles_Border.toJSON(message.border) : undefined);
    message.colors !== undefined &&
      (obj.colors = message.colors ? ButtonData_Styles_Colors.toJSON(message.colors) : undefined);
    return obj;
  },
};

const baseButtonData_Styles_Colors: object = {};

export const ButtonData_Styles_Colors = {
  fromJSON(object: any): ButtonData_Styles_Colors {
    const message = { ...baseButtonData_Styles_Colors } as ButtonData_Styles_Colors;
    if (object.text !== undefined && object.text !== null) {
      message.text = String(object.text);
    } else {
      message.text = undefined;
    }
    if (object.border !== undefined && object.border !== null) {
      message.border = String(object.border);
    } else {
      message.border = undefined;
    }
    if (object.background !== undefined && object.background !== null) {
      message.background = String(object.background);
    } else {
      message.background = undefined;
    }
    return message;
  },

  toJSON(message: ButtonData_Styles_Colors): unknown {
    const obj: any = {};
    message.text !== undefined && (obj.text = message.text);
    message.border !== undefined && (obj.border = message.border);
    message.background !== undefined && (obj.background = message.background);
    return obj;
  },
};

const baseButtonData_Styles_Border: object = {};

export const ButtonData_Styles_Border = {
  fromJSON(object: any): ButtonData_Styles_Border {
    const message = { ...baseButtonData_Styles_Border } as ButtonData_Styles_Border;
    if (object.width !== undefined && object.width !== null) {
      message.width = Number(object.width);
    } else {
      message.width = undefined;
    }
    if (object.radius !== undefined && object.radius !== null) {
      message.radius = Number(object.radius);
    } else {
      message.radius = undefined;
    }
    return message;
  },

  toJSON(message: ButtonData_Styles_Border): unknown {
    const obj: any = {};
    message.width !== undefined && (obj.width = message.width);
    message.radius !== undefined && (obj.radius = message.radius);
    return obj;
  },
};
