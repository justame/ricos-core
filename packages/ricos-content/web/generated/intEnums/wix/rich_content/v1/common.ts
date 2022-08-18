/* eslint-disable */
export interface TextStyle {
  textAlignment: TextStyle_TextAlignment;
  /** CSS value */
  lineHeight?: string;
}

export const enum TextStyle_TextAlignment {
  AUTO = 0,
  LEFT = 1,
  RIGHT = 2,
  CENTER = 3,
  JUSTIFY = 4,
  UNRECOGNIZED = -1,
}

export function textStyle_TextAlignmentFromJSON(object: any): TextStyle_TextAlignment {
  switch (object) {
    case 0:
    case 'AUTO':
      return TextStyle_TextAlignment.AUTO;
    case 1:
    case 'LEFT':
      return TextStyle_TextAlignment.LEFT;
    case 2:
    case 'RIGHT':
      return TextStyle_TextAlignment.RIGHT;
    case 3:
    case 'CENTER':
      return TextStyle_TextAlignment.CENTER;
    case 4:
    case 'JUSTIFY':
      return TextStyle_TextAlignment.JUSTIFY;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return TextStyle_TextAlignment.UNRECOGNIZED;
  }
}

export function textStyle_TextAlignmentToJSON(object: TextStyle_TextAlignment): string {
  switch (object) {
    case TextStyle_TextAlignment.AUTO:
      return 'AUTO';
    case TextStyle_TextAlignment.LEFT:
      return 'LEFT';
    case TextStyle_TextAlignment.RIGHT:
      return 'RIGHT';
    case TextStyle_TextAlignment.CENTER:
      return 'CENTER';
    case TextStyle_TextAlignment.JUSTIFY:
      return 'JUSTIFY';
    default:
      return 'UNKNOWN';
  }
}

export interface Link {
  url: string | undefined;
  /** Key of linked node in document */
  anchor: string | undefined;
  target: Link_Target;
  rel?: Link_Rel;
  /** Serialized object, used for custom/external link panel */
  customData?: string;
}

export const enum Link_Target {
  SELF = 0,
  BLANK = 1,
  PARENT = 2,
  TOP = 3,
  UNRECOGNIZED = -1,
}

export function link_TargetFromJSON(object: any): Link_Target {
  switch (object) {
    case 0:
    case 'SELF':
      return Link_Target.SELF;
    case 1:
    case 'BLANK':
      return Link_Target.BLANK;
    case 2:
    case 'PARENT':
      return Link_Target.PARENT;
    case 3:
    case 'TOP':
      return Link_Target.TOP;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return Link_Target.UNRECOGNIZED;
  }
}

export function link_TargetToJSON(object: Link_Target): string {
  switch (object) {
    case Link_Target.SELF:
      return 'SELF';
    case Link_Target.BLANK:
      return 'BLANK';
    case Link_Target.PARENT:
      return 'PARENT';
    case Link_Target.TOP:
      return 'TOP';
    default:
      return 'UNKNOWN';
  }
}

export interface Link_Rel {
  /** Indicates to search engine crawlers that the link should not be followed */
  nofollow?: boolean;
  /** Paid links */
  sponsored?: boolean;
  /** UoU generated link */
  ugc?: boolean;
}

export interface PluginContainerData {
  width?: PluginContainerData_Width;
  alignment: PluginContainerData_Alignment;
  spoiler?: PluginContainerData_Spoiler;
  height?: PluginContainerData_Height;
  textWrap?: boolean;
}

export const enum PluginContainerData_Alignment {
  CENTER = 0,
  LEFT = 1,
  RIGHT = 2,
  UNRECOGNIZED = -1,
}

export function pluginContainerData_AlignmentFromJSON(object: any): PluginContainerData_Alignment {
  switch (object) {
    case 0:
    case 'CENTER':
      return PluginContainerData_Alignment.CENTER;
    case 1:
    case 'LEFT':
      return PluginContainerData_Alignment.LEFT;
    case 2:
    case 'RIGHT':
      return PluginContainerData_Alignment.RIGHT;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return PluginContainerData_Alignment.UNRECOGNIZED;
  }
}

export function pluginContainerData_AlignmentToJSON(object: PluginContainerData_Alignment): string {
  switch (object) {
    case PluginContainerData_Alignment.CENTER:
      return 'CENTER';
    case PluginContainerData_Alignment.LEFT:
      return 'LEFT';
    case PluginContainerData_Alignment.RIGHT:
      return 'RIGHT';
    default:
      return 'UNKNOWN';
  }
}

export interface PluginContainerData_Spoiler {
  enabled?: boolean;
  description?: string;
  buttonText?: string;
}

export interface PluginContainerData_Width {
  size: PluginContainerData_Width_Type | undefined;
  custom?: string;
}

export const enum PluginContainerData_Width_Type {
  CONTENT = 0,
  SMALL = 1,
  ORIGINAL = 2,
  FULL_WIDTH = 3,
  UNRECOGNIZED = -1,
}

export function pluginContainerData_Width_TypeFromJSON(
  object: any
): PluginContainerData_Width_Type {
  switch (object) {
    case 0:
    case 'CONTENT':
      return PluginContainerData_Width_Type.CONTENT;
    case 1:
    case 'SMALL':
      return PluginContainerData_Width_Type.SMALL;
    case 2:
    case 'ORIGINAL':
      return PluginContainerData_Width_Type.ORIGINAL;
    case 3:
    case 'FULL_WIDTH':
      return PluginContainerData_Width_Type.FULL_WIDTH;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return PluginContainerData_Width_Type.UNRECOGNIZED;
  }
}

export function pluginContainerData_Width_TypeToJSON(
  object: PluginContainerData_Width_Type
): string {
  switch (object) {
    case PluginContainerData_Width_Type.CONTENT:
      return 'CONTENT';
    case PluginContainerData_Width_Type.SMALL:
      return 'SMALL';
    case PluginContainerData_Width_Type.ORIGINAL:
      return 'ORIGINAL';
    case PluginContainerData_Width_Type.FULL_WIDTH:
      return 'FULL_WIDTH';
    default:
      return 'UNKNOWN';
  }
}

export interface PluginContainerData_Height {
  custom?: string;
}

export interface FileSource {
  /** Absolute URL */
  url?: string;
  /**
   * Custom ID
   *
   * @deprecated
   */
  custom?: string;
  /** ID that will be resolved to a URL by a resolver function */
  id?: string;
  private?: boolean;
}

export interface Media {
  src?: FileSource;
  width?: number;
  height?: number;
  duration?: number;
}

export interface Oembed {
  type?: string;
  width?: number;
  height?: number;
  title?: string;
  url?: string;
  html?: string;
  authorName?: string;
  authorUrl?: string;
  providerName?: string;
  providerUrl?: string;
  thumbnailUrl?: string;
  thumbnailWidth?: string;
  thumbnailHeight?: string;
  videoUrl?: string;
  version?: string;
}

const baseTextStyle: object = { textAlignment: 0 };

export const TextStyle = {
  fromJSON(object: any): TextStyle {
    const message = { ...baseTextStyle } as TextStyle;
    if (object.textAlignment !== undefined && object.textAlignment !== null) {
      message.textAlignment = textStyle_TextAlignmentFromJSON(object.textAlignment);
    } else {
      message.textAlignment = 0;
    }
    if (object.lineHeight !== undefined && object.lineHeight !== null) {
      message.lineHeight = String(object.lineHeight);
    } else {
      message.lineHeight = undefined;
    }
    return message;
  },

  toJSON(message: TextStyle): unknown {
    const obj: any = {};
    message.textAlignment !== undefined &&
      (obj.textAlignment = textStyle_TextAlignmentToJSON(message.textAlignment));
    message.lineHeight !== undefined && (obj.lineHeight = message.lineHeight);
    return obj;
  },
};

const baseLink: object = { target: 0 };

export const Link = {
  fromJSON(object: any): Link {
    const message = { ...baseLink } as Link;
    if (object.url !== undefined && object.url !== null) {
      message.url = String(object.url);
    } else {
      message.url = undefined;
    }
    if (object.anchor !== undefined && object.anchor !== null) {
      message.anchor = String(object.anchor);
    } else {
      message.anchor = undefined;
    }
    if (object.target !== undefined && object.target !== null) {
      message.target = link_TargetFromJSON(object.target);
    } else {
      message.target = 0;
    }
    if (object.rel !== undefined && object.rel !== null) {
      message.rel = Link_Rel.fromJSON(object.rel);
    } else {
      message.rel = undefined;
    }
    if (object.customData !== undefined && object.customData !== null) {
      message.customData = String(object.customData);
    } else {
      message.customData = undefined;
    }
    return message;
  },

  toJSON(message: Link): unknown {
    const obj: any = {};
    message.url !== undefined && (obj.url = message.url);
    message.anchor !== undefined && (obj.anchor = message.anchor);
    message.target !== undefined && (obj.target = link_TargetToJSON(message.target));
    message.rel !== undefined && (obj.rel = message.rel ? Link_Rel.toJSON(message.rel) : undefined);
    message.customData !== undefined && (obj.customData = message.customData);
    return obj;
  },
};

const baseLink_Rel: object = {};

export const Link_Rel = {
  fromJSON(object: any): Link_Rel {
    const message = { ...baseLink_Rel } as Link_Rel;
    if (object.nofollow !== undefined && object.nofollow !== null) {
      message.nofollow = Boolean(object.nofollow);
    } else {
      message.nofollow = undefined;
    }
    if (object.sponsored !== undefined && object.sponsored !== null) {
      message.sponsored = Boolean(object.sponsored);
    } else {
      message.sponsored = undefined;
    }
    if (object.ugc !== undefined && object.ugc !== null) {
      message.ugc = Boolean(object.ugc);
    } else {
      message.ugc = undefined;
    }
    return message;
  },

  toJSON(message: Link_Rel): unknown {
    const obj: any = {};
    message.nofollow !== undefined && (obj.nofollow = message.nofollow);
    message.sponsored !== undefined && (obj.sponsored = message.sponsored);
    message.ugc !== undefined && (obj.ugc = message.ugc);
    return obj;
  },
};

const basePluginContainerData: object = { alignment: 0 };

export const PluginContainerData = {
  fromJSON(object: any): PluginContainerData {
    const message = { ...basePluginContainerData } as PluginContainerData;
    if (object.width !== undefined && object.width !== null) {
      message.width = PluginContainerData_Width.fromJSON(object.width);
    } else {
      message.width = undefined;
    }
    if (object.alignment !== undefined && object.alignment !== null) {
      message.alignment = pluginContainerData_AlignmentFromJSON(object.alignment);
    } else {
      message.alignment = 0;
    }
    if (object.spoiler !== undefined && object.spoiler !== null) {
      message.spoiler = PluginContainerData_Spoiler.fromJSON(object.spoiler);
    } else {
      message.spoiler = undefined;
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = PluginContainerData_Height.fromJSON(object.height);
    } else {
      message.height = undefined;
    }
    if (object.textWrap !== undefined && object.textWrap !== null) {
      message.textWrap = Boolean(object.textWrap);
    } else {
      message.textWrap = undefined;
    }
    return message;
  },

  toJSON(message: PluginContainerData): unknown {
    const obj: any = {};
    message.width !== undefined &&
      (obj.width = message.width ? PluginContainerData_Width.toJSON(message.width) : undefined);
    message.alignment !== undefined &&
      (obj.alignment = pluginContainerData_AlignmentToJSON(message.alignment));
    message.spoiler !== undefined &&
      (obj.spoiler = message.spoiler
        ? PluginContainerData_Spoiler.toJSON(message.spoiler)
        : undefined);
    message.height !== undefined &&
      (obj.height = message.height ? PluginContainerData_Height.toJSON(message.height) : undefined);
    message.textWrap !== undefined && (obj.textWrap = message.textWrap);
    return obj;
  },
};

const basePluginContainerData_Spoiler: object = {};

export const PluginContainerData_Spoiler = {
  fromJSON(object: any): PluginContainerData_Spoiler {
    const message = { ...basePluginContainerData_Spoiler } as PluginContainerData_Spoiler;
    if (object.enabled !== undefined && object.enabled !== null) {
      message.enabled = Boolean(object.enabled);
    } else {
      message.enabled = undefined;
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = undefined;
    }
    if (object.buttonText !== undefined && object.buttonText !== null) {
      message.buttonText = String(object.buttonText);
    } else {
      message.buttonText = undefined;
    }
    return message;
  },

  toJSON(message: PluginContainerData_Spoiler): unknown {
    const obj: any = {};
    message.enabled !== undefined && (obj.enabled = message.enabled);
    message.description !== undefined && (obj.description = message.description);
    message.buttonText !== undefined && (obj.buttonText = message.buttonText);
    return obj;
  },
};

const basePluginContainerData_Width: object = {};

export const PluginContainerData_Width = {
  fromJSON(object: any): PluginContainerData_Width {
    const message = { ...basePluginContainerData_Width } as PluginContainerData_Width;
    if (object.size !== undefined && object.size !== null) {
      message.size = pluginContainerData_Width_TypeFromJSON(object.size);
    } else {
      message.size = undefined;
    }
    if (object.custom !== undefined && object.custom !== null) {
      message.custom = String(object.custom);
    } else {
      message.custom = undefined;
    }
    return message;
  },

  toJSON(message: PluginContainerData_Width): unknown {
    const obj: any = {};
    message.size !== undefined &&
      (obj.size =
        message.size !== undefined
          ? pluginContainerData_Width_TypeToJSON(message.size)
          : undefined);
    message.custom !== undefined && (obj.custom = message.custom);
    return obj;
  },
};

const basePluginContainerData_Height: object = {};

export const PluginContainerData_Height = {
  fromJSON(object: any): PluginContainerData_Height {
    const message = { ...basePluginContainerData_Height } as PluginContainerData_Height;
    if (object.custom !== undefined && object.custom !== null) {
      message.custom = String(object.custom);
    } else {
      message.custom = undefined;
    }
    return message;
  },

  toJSON(message: PluginContainerData_Height): unknown {
    const obj: any = {};
    message.custom !== undefined && (obj.custom = message.custom);
    return obj;
  },
};

const baseFileSource: object = {};

export const FileSource = {
  fromJSON(object: any): FileSource {
    const message = { ...baseFileSource } as FileSource;
    if (object.url !== undefined && object.url !== null) {
      message.url = String(object.url);
    } else {
      message.url = undefined;
    }
    if (object.custom !== undefined && object.custom !== null) {
      message.custom = String(object.custom);
    } else {
      message.custom = undefined;
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = undefined;
    }
    if (object.private !== undefined && object.private !== null) {
      message.private = Boolean(object.private);
    } else {
      message.private = undefined;
    }
    return message;
  },

  toJSON(message: FileSource): unknown {
    const obj: any = {};
    message.url !== undefined && (obj.url = message.url);
    message.custom !== undefined && (obj.custom = message.custom);
    message.id !== undefined && (obj.id = message.id);
    message.private !== undefined && (obj.private = message.private);
    return obj;
  },
};

const baseMedia: object = {};

export const Media = {
  fromJSON(object: any): Media {
    const message = { ...baseMedia } as Media;
    if (object.src !== undefined && object.src !== null) {
      message.src = FileSource.fromJSON(object.src);
    } else {
      message.src = undefined;
    }
    if (object.width !== undefined && object.width !== null) {
      message.width = Number(object.width);
    } else {
      message.width = undefined;
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = Number(object.height);
    } else {
      message.height = undefined;
    }
    if (object.duration !== undefined && object.duration !== null) {
      message.duration = Number(object.duration);
    } else {
      message.duration = undefined;
    }
    return message;
  },

  toJSON(message: Media): unknown {
    const obj: any = {};
    message.src !== undefined &&
      (obj.src = message.src ? FileSource.toJSON(message.src) : undefined);
    message.width !== undefined && (obj.width = message.width);
    message.height !== undefined && (obj.height = message.height);
    message.duration !== undefined && (obj.duration = message.duration);
    return obj;
  },
};

const baseOembed: object = {};

export const Oembed = {
  fromJSON(object: any): Oembed {
    const message = { ...baseOembed } as Oembed;
    if (object.type !== undefined && object.type !== null) {
      message.type = String(object.type);
    } else {
      message.type = undefined;
    }
    if (object.width !== undefined && object.width !== null) {
      message.width = Number(object.width);
    } else {
      message.width = undefined;
    }
    if (object.height !== undefined && object.height !== null) {
      message.height = Number(object.height);
    } else {
      message.height = undefined;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = undefined;
    }
    if (object.url !== undefined && object.url !== null) {
      message.url = String(object.url);
    } else {
      message.url = undefined;
    }
    if (object.html !== undefined && object.html !== null) {
      message.html = String(object.html);
    } else {
      message.html = undefined;
    }
    if (object.authorName !== undefined && object.authorName !== null) {
      message.authorName = String(object.authorName);
    } else {
      message.authorName = undefined;
    }
    if (object.authorUrl !== undefined && object.authorUrl !== null) {
      message.authorUrl = String(object.authorUrl);
    } else {
      message.authorUrl = undefined;
    }
    if (object.providerName !== undefined && object.providerName !== null) {
      message.providerName = String(object.providerName);
    } else {
      message.providerName = undefined;
    }
    if (object.providerUrl !== undefined && object.providerUrl !== null) {
      message.providerUrl = String(object.providerUrl);
    } else {
      message.providerUrl = undefined;
    }
    if (object.thumbnailUrl !== undefined && object.thumbnailUrl !== null) {
      message.thumbnailUrl = String(object.thumbnailUrl);
    } else {
      message.thumbnailUrl = undefined;
    }
    if (object.thumbnailWidth !== undefined && object.thumbnailWidth !== null) {
      message.thumbnailWidth = String(object.thumbnailWidth);
    } else {
      message.thumbnailWidth = undefined;
    }
    if (object.thumbnailHeight !== undefined && object.thumbnailHeight !== null) {
      message.thumbnailHeight = String(object.thumbnailHeight);
    } else {
      message.thumbnailHeight = undefined;
    }
    if (object.videoUrl !== undefined && object.videoUrl !== null) {
      message.videoUrl = String(object.videoUrl);
    } else {
      message.videoUrl = undefined;
    }
    if (object.version !== undefined && object.version !== null) {
      message.version = String(object.version);
    } else {
      message.version = undefined;
    }
    return message;
  },

  toJSON(message: Oembed): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = message.type);
    message.width !== undefined && (obj.width = message.width);
    message.height !== undefined && (obj.height = message.height);
    message.title !== undefined && (obj.title = message.title);
    message.url !== undefined && (obj.url = message.url);
    message.html !== undefined && (obj.html = message.html);
    message.authorName !== undefined && (obj.authorName = message.authorName);
    message.authorUrl !== undefined && (obj.authorUrl = message.authorUrl);
    message.providerName !== undefined && (obj.providerName = message.providerName);
    message.providerUrl !== undefined && (obj.providerUrl = message.providerUrl);
    message.thumbnailUrl !== undefined && (obj.thumbnailUrl = message.thumbnailUrl);
    message.thumbnailWidth !== undefined && (obj.thumbnailWidth = message.thumbnailWidth);
    message.thumbnailHeight !== undefined && (obj.thumbnailHeight = message.thumbnailHeight);
    message.videoUrl !== undefined && (obj.videoUrl = message.videoUrl);
    message.version !== undefined && (obj.version = message.version);
    return obj;
  },
};
