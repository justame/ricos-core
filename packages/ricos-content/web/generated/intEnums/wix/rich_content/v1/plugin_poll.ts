/* eslint-disable */
import { PluginContainerData, Media } from './common';

export interface PollData {
  containerData?: PluginContainerData;
  poll?: PollData_Poll;
  layout?: PollData_Layout;
  design?: PollData_Design;
}

export interface PollData_Poll {
  id?: string;
  title?: string;
  creatorId?: string;
  image?: Media;
  options: PollData_Poll_Option[];
  settings?: PollData_Poll_Settings;
}

export interface PollData_Poll_Option {
  id?: string;
  title?: string;
  image?: Media;
}

export interface PollData_Poll_Settings {
  permissions?: PollData_Poll_Settings_Permissions;
  showVoters?: boolean;
  showVotesCount?: boolean;
}

export interface PollData_Poll_Settings_Permissions {
  view: PollData_Poll_Settings_Permissions_ViewRole;
  vote: PollData_Poll_Settings_Permissions_VoteRole;
  allowMultipleVotes?: boolean;
}

export const enum PollData_Poll_Settings_Permissions_ViewRole {
  CREATOR = 0,
  VOTERS = 1,
  EVERYONE = 2,
  UNRECOGNIZED = -1,
}

export function pollData_Poll_Settings_Permissions_ViewRoleFromJSON(
  object: any
): PollData_Poll_Settings_Permissions_ViewRole {
  switch (object) {
    case 0:
    case 'CREATOR':
      return PollData_Poll_Settings_Permissions_ViewRole.CREATOR;
    case 1:
    case 'VOTERS':
      return PollData_Poll_Settings_Permissions_ViewRole.VOTERS;
    case 2:
    case 'EVERYONE':
      return PollData_Poll_Settings_Permissions_ViewRole.EVERYONE;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return PollData_Poll_Settings_Permissions_ViewRole.UNRECOGNIZED;
  }
}

export function pollData_Poll_Settings_Permissions_ViewRoleToJSON(
  object: PollData_Poll_Settings_Permissions_ViewRole
): string {
  switch (object) {
    case PollData_Poll_Settings_Permissions_ViewRole.CREATOR:
      return 'CREATOR';
    case PollData_Poll_Settings_Permissions_ViewRole.VOTERS:
      return 'VOTERS';
    case PollData_Poll_Settings_Permissions_ViewRole.EVERYONE:
      return 'EVERYONE';
    default:
      return 'UNKNOWN';
  }
}

export const enum PollData_Poll_Settings_Permissions_VoteRole {
  SITE_MEMBERS = 0,
  ALL = 1,
  UNRECOGNIZED = -1,
}

export function pollData_Poll_Settings_Permissions_VoteRoleFromJSON(
  object: any
): PollData_Poll_Settings_Permissions_VoteRole {
  switch (object) {
    case 0:
    case 'SITE_MEMBERS':
      return PollData_Poll_Settings_Permissions_VoteRole.SITE_MEMBERS;
    case 1:
    case 'ALL':
      return PollData_Poll_Settings_Permissions_VoteRole.ALL;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return PollData_Poll_Settings_Permissions_VoteRole.UNRECOGNIZED;
  }
}

export function pollData_Poll_Settings_Permissions_VoteRoleToJSON(
  object: PollData_Poll_Settings_Permissions_VoteRole
): string {
  switch (object) {
    case PollData_Poll_Settings_Permissions_VoteRole.SITE_MEMBERS:
      return 'SITE_MEMBERS';
    case PollData_Poll_Settings_Permissions_VoteRole.ALL:
      return 'ALL';
    default:
      return 'UNKNOWN';
  }
}

export interface PollData_Layout {
  poll?: PollData_Layout_PollLayout;
  options?: PollData_Layout_OptionLayout;
}

export interface PollData_Layout_PollLayout {
  type: PollData_Layout_PollLayout_Type;
  direction: PollData_Layout_PollLayout_Direction;
  enableImage?: boolean;
}

export const enum PollData_Layout_PollLayout_Type {
  LIST = 0,
  GRID = 1,
  UNRECOGNIZED = -1,
}

export function pollData_Layout_PollLayout_TypeFromJSON(
  object: any
): PollData_Layout_PollLayout_Type {
  switch (object) {
    case 0:
    case 'LIST':
      return PollData_Layout_PollLayout_Type.LIST;
    case 1:
    case 'GRID':
      return PollData_Layout_PollLayout_Type.GRID;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return PollData_Layout_PollLayout_Type.UNRECOGNIZED;
  }
}

export function pollData_Layout_PollLayout_TypeToJSON(
  object: PollData_Layout_PollLayout_Type
): string {
  switch (object) {
    case PollData_Layout_PollLayout_Type.LIST:
      return 'LIST';
    case PollData_Layout_PollLayout_Type.GRID:
      return 'GRID';
    default:
      return 'UNKNOWN';
  }
}

export const enum PollData_Layout_PollLayout_Direction {
  LTR = 0,
  RTL = 1,
  UNRECOGNIZED = -1,
}

export function pollData_Layout_PollLayout_DirectionFromJSON(
  object: any
): PollData_Layout_PollLayout_Direction {
  switch (object) {
    case 0:
    case 'LTR':
      return PollData_Layout_PollLayout_Direction.LTR;
    case 1:
    case 'RTL':
      return PollData_Layout_PollLayout_Direction.RTL;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return PollData_Layout_PollLayout_Direction.UNRECOGNIZED;
  }
}

export function pollData_Layout_PollLayout_DirectionToJSON(
  object: PollData_Layout_PollLayout_Direction
): string {
  switch (object) {
    case PollData_Layout_PollLayout_Direction.LTR:
      return 'LTR';
    case PollData_Layout_PollLayout_Direction.RTL:
      return 'RTL';
    default:
      return 'UNKNOWN';
  }
}

export interface PollData_Layout_OptionLayout {
  enableImage?: boolean;
}

export interface PollData_Design {
  poll?: PollData_Design_PollDesign;
  options?: PollData_Design_OptionDesign;
}

export interface PollData_Design_PollDesign {
  background?: PollData_Design_PollDesign_Background;
  borderRadius?: number;
}

export interface PollData_Design_PollDesign_Background {
  type: PollData_Design_PollDesign_Background_Type;
  color?: string;
  image?: Media | undefined;
  gradient?: PollData_Design_PollDesign_Background_Gradient | undefined;
}

export const enum PollData_Design_PollDesign_Background_Type {
  COLOR = 0,
  IMAGE = 1,
  GRADIENT = 2,
  UNRECOGNIZED = -1,
}

export function pollData_Design_PollDesign_Background_TypeFromJSON(
  object: any
): PollData_Design_PollDesign_Background_Type {
  switch (object) {
    case 0:
    case 'COLOR':
      return PollData_Design_PollDesign_Background_Type.COLOR;
    case 1:
    case 'IMAGE':
      return PollData_Design_PollDesign_Background_Type.IMAGE;
    case 2:
    case 'GRADIENT':
      return PollData_Design_PollDesign_Background_Type.GRADIENT;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return PollData_Design_PollDesign_Background_Type.UNRECOGNIZED;
  }
}

export function pollData_Design_PollDesign_Background_TypeToJSON(
  object: PollData_Design_PollDesign_Background_Type
): string {
  switch (object) {
    case PollData_Design_PollDesign_Background_Type.COLOR:
      return 'COLOR';
    case PollData_Design_PollDesign_Background_Type.IMAGE:
      return 'IMAGE';
    case PollData_Design_PollDesign_Background_Type.GRADIENT:
      return 'GRADIENT';
    default:
      return 'UNKNOWN';
  }
}

export interface PollData_Design_PollDesign_Background_Gradient {
  angle?: number;
  startColor?: string;
  lastColor?: string;
}

export interface PollData_Design_OptionDesign {
  borderRadius?: number;
}

const basePollData: object = {};

export const PollData = {
  fromJSON(object: any): PollData {
    const message = { ...basePollData } as PollData;
    if (object.containerData !== undefined && object.containerData !== null) {
      message.containerData = PluginContainerData.fromJSON(object.containerData);
    } else {
      message.containerData = undefined;
    }
    if (object.poll !== undefined && object.poll !== null) {
      message.poll = PollData_Poll.fromJSON(object.poll);
    } else {
      message.poll = undefined;
    }
    if (object.layout !== undefined && object.layout !== null) {
      message.layout = PollData_Layout.fromJSON(object.layout);
    } else {
      message.layout = undefined;
    }
    if (object.design !== undefined && object.design !== null) {
      message.design = PollData_Design.fromJSON(object.design);
    } else {
      message.design = undefined;
    }
    return message;
  },

  toJSON(message: PollData): unknown {
    const obj: any = {};
    message.containerData !== undefined &&
      (obj.containerData = message.containerData
        ? PluginContainerData.toJSON(message.containerData)
        : undefined);
    message.poll !== undefined &&
      (obj.poll = message.poll ? PollData_Poll.toJSON(message.poll) : undefined);
    message.layout !== undefined &&
      (obj.layout = message.layout ? PollData_Layout.toJSON(message.layout) : undefined);
    message.design !== undefined &&
      (obj.design = message.design ? PollData_Design.toJSON(message.design) : undefined);
    return obj;
  },
};

const basePollData_Poll: object = {};

export const PollData_Poll = {
  fromJSON(object: any): PollData_Poll {
    const message = { ...basePollData_Poll } as PollData_Poll;
    message.options = [];
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = undefined;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = undefined;
    }
    if (object.creatorId !== undefined && object.creatorId !== null) {
      message.creatorId = String(object.creatorId);
    } else {
      message.creatorId = undefined;
    }
    if (object.image !== undefined && object.image !== null) {
      message.image = Media.fromJSON(object.image);
    } else {
      message.image = undefined;
    }
    if (object.options !== undefined && object.options !== null) {
      for (const e of object.options) {
        message.options.push(PollData_Poll_Option.fromJSON(e));
      }
    }
    if (object.settings !== undefined && object.settings !== null) {
      message.settings = PollData_Poll_Settings.fromJSON(object.settings);
    } else {
      message.settings = undefined;
    }
    return message;
  },

  toJSON(message: PollData_Poll): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.title !== undefined && (obj.title = message.title);
    message.creatorId !== undefined && (obj.creatorId = message.creatorId);
    message.image !== undefined &&
      (obj.image = message.image ? Media.toJSON(message.image) : undefined);
    if (message.options) {
      obj.options = message.options.map(e => (e ? PollData_Poll_Option.toJSON(e) : undefined));
    } else {
      obj.options = [];
    }
    message.settings !== undefined &&
      (obj.settings = message.settings
        ? PollData_Poll_Settings.toJSON(message.settings)
        : undefined);
    return obj;
  },
};

const basePollData_Poll_Option: object = {};

export const PollData_Poll_Option = {
  fromJSON(object: any): PollData_Poll_Option {
    const message = { ...basePollData_Poll_Option } as PollData_Poll_Option;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = undefined;
    }
    if (object.title !== undefined && object.title !== null) {
      message.title = String(object.title);
    } else {
      message.title = undefined;
    }
    if (object.image !== undefined && object.image !== null) {
      message.image = Media.fromJSON(object.image);
    } else {
      message.image = undefined;
    }
    return message;
  },

  toJSON(message: PollData_Poll_Option): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.title !== undefined && (obj.title = message.title);
    message.image !== undefined &&
      (obj.image = message.image ? Media.toJSON(message.image) : undefined);
    return obj;
  },
};

const basePollData_Poll_Settings: object = {};

export const PollData_Poll_Settings = {
  fromJSON(object: any): PollData_Poll_Settings {
    const message = { ...basePollData_Poll_Settings } as PollData_Poll_Settings;
    if (object.permissions !== undefined && object.permissions !== null) {
      message.permissions = PollData_Poll_Settings_Permissions.fromJSON(object.permissions);
    } else {
      message.permissions = undefined;
    }
    if (object.showVoters !== undefined && object.showVoters !== null) {
      message.showVoters = Boolean(object.showVoters);
    } else {
      message.showVoters = undefined;
    }
    if (object.showVotesCount !== undefined && object.showVotesCount !== null) {
      message.showVotesCount = Boolean(object.showVotesCount);
    } else {
      message.showVotesCount = undefined;
    }
    return message;
  },

  toJSON(message: PollData_Poll_Settings): unknown {
    const obj: any = {};
    message.permissions !== undefined &&
      (obj.permissions = message.permissions
        ? PollData_Poll_Settings_Permissions.toJSON(message.permissions)
        : undefined);
    message.showVoters !== undefined && (obj.showVoters = message.showVoters);
    message.showVotesCount !== undefined && (obj.showVotesCount = message.showVotesCount);
    return obj;
  },
};

const basePollData_Poll_Settings_Permissions: object = { view: 0, vote: 0 };

export const PollData_Poll_Settings_Permissions = {
  fromJSON(object: any): PollData_Poll_Settings_Permissions {
    const message = {
      ...basePollData_Poll_Settings_Permissions,
    } as PollData_Poll_Settings_Permissions;
    if (object.view !== undefined && object.view !== null) {
      message.view = pollData_Poll_Settings_Permissions_ViewRoleFromJSON(object.view);
    } else {
      message.view = 0;
    }
    if (object.vote !== undefined && object.vote !== null) {
      message.vote = pollData_Poll_Settings_Permissions_VoteRoleFromJSON(object.vote);
    } else {
      message.vote = 0;
    }
    if (object.allowMultipleVotes !== undefined && object.allowMultipleVotes !== null) {
      message.allowMultipleVotes = Boolean(object.allowMultipleVotes);
    } else {
      message.allowMultipleVotes = undefined;
    }
    return message;
  },

  toJSON(message: PollData_Poll_Settings_Permissions): unknown {
    const obj: any = {};
    message.view !== undefined &&
      (obj.view = pollData_Poll_Settings_Permissions_ViewRoleToJSON(message.view));
    message.vote !== undefined &&
      (obj.vote = pollData_Poll_Settings_Permissions_VoteRoleToJSON(message.vote));
    message.allowMultipleVotes !== undefined &&
      (obj.allowMultipleVotes = message.allowMultipleVotes);
    return obj;
  },
};

const basePollData_Layout: object = {};

export const PollData_Layout = {
  fromJSON(object: any): PollData_Layout {
    const message = { ...basePollData_Layout } as PollData_Layout;
    if (object.poll !== undefined && object.poll !== null) {
      message.poll = PollData_Layout_PollLayout.fromJSON(object.poll);
    } else {
      message.poll = undefined;
    }
    if (object.options !== undefined && object.options !== null) {
      message.options = PollData_Layout_OptionLayout.fromJSON(object.options);
    } else {
      message.options = undefined;
    }
    return message;
  },

  toJSON(message: PollData_Layout): unknown {
    const obj: any = {};
    message.poll !== undefined &&
      (obj.poll = message.poll ? PollData_Layout_PollLayout.toJSON(message.poll) : undefined);
    message.options !== undefined &&
      (obj.options = message.options
        ? PollData_Layout_OptionLayout.toJSON(message.options)
        : undefined);
    return obj;
  },
};

const basePollData_Layout_PollLayout: object = { type: 0, direction: 0 };

export const PollData_Layout_PollLayout = {
  fromJSON(object: any): PollData_Layout_PollLayout {
    const message = { ...basePollData_Layout_PollLayout } as PollData_Layout_PollLayout;
    if (object.type !== undefined && object.type !== null) {
      message.type = pollData_Layout_PollLayout_TypeFromJSON(object.type);
    } else {
      message.type = 0;
    }
    if (object.direction !== undefined && object.direction !== null) {
      message.direction = pollData_Layout_PollLayout_DirectionFromJSON(object.direction);
    } else {
      message.direction = 0;
    }
    if (object.enableImage !== undefined && object.enableImage !== null) {
      message.enableImage = Boolean(object.enableImage);
    } else {
      message.enableImage = undefined;
    }
    return message;
  },

  toJSON(message: PollData_Layout_PollLayout): unknown {
    const obj: any = {};
    message.type !== undefined && (obj.type = pollData_Layout_PollLayout_TypeToJSON(message.type));
    message.direction !== undefined &&
      (obj.direction = pollData_Layout_PollLayout_DirectionToJSON(message.direction));
    message.enableImage !== undefined && (obj.enableImage = message.enableImage);
    return obj;
  },
};

const basePollData_Layout_OptionLayout: object = {};

export const PollData_Layout_OptionLayout = {
  fromJSON(object: any): PollData_Layout_OptionLayout {
    const message = { ...basePollData_Layout_OptionLayout } as PollData_Layout_OptionLayout;
    if (object.enableImage !== undefined && object.enableImage !== null) {
      message.enableImage = Boolean(object.enableImage);
    } else {
      message.enableImage = undefined;
    }
    return message;
  },

  toJSON(message: PollData_Layout_OptionLayout): unknown {
    const obj: any = {};
    message.enableImage !== undefined && (obj.enableImage = message.enableImage);
    return obj;
  },
};

const basePollData_Design: object = {};

export const PollData_Design = {
  fromJSON(object: any): PollData_Design {
    const message = { ...basePollData_Design } as PollData_Design;
    if (object.poll !== undefined && object.poll !== null) {
      message.poll = PollData_Design_PollDesign.fromJSON(object.poll);
    } else {
      message.poll = undefined;
    }
    if (object.options !== undefined && object.options !== null) {
      message.options = PollData_Design_OptionDesign.fromJSON(object.options);
    } else {
      message.options = undefined;
    }
    return message;
  },

  toJSON(message: PollData_Design): unknown {
    const obj: any = {};
    message.poll !== undefined &&
      (obj.poll = message.poll ? PollData_Design_PollDesign.toJSON(message.poll) : undefined);
    message.options !== undefined &&
      (obj.options = message.options
        ? PollData_Design_OptionDesign.toJSON(message.options)
        : undefined);
    return obj;
  },
};

const basePollData_Design_PollDesign: object = {};

export const PollData_Design_PollDesign = {
  fromJSON(object: any): PollData_Design_PollDesign {
    const message = { ...basePollData_Design_PollDesign } as PollData_Design_PollDesign;
    if (object.background !== undefined && object.background !== null) {
      message.background = PollData_Design_PollDesign_Background.fromJSON(object.background);
    } else {
      message.background = undefined;
    }
    if (object.borderRadius !== undefined && object.borderRadius !== null) {
      message.borderRadius = Number(object.borderRadius);
    } else {
      message.borderRadius = undefined;
    }
    return message;
  },

  toJSON(message: PollData_Design_PollDesign): unknown {
    const obj: any = {};
    message.background !== undefined &&
      (obj.background = message.background
        ? PollData_Design_PollDesign_Background.toJSON(message.background)
        : undefined);
    message.borderRadius !== undefined && (obj.borderRadius = message.borderRadius);
    return obj;
  },
};

const basePollData_Design_PollDesign_Background: object = { type: 0 };

export const PollData_Design_PollDesign_Background = {
  fromJSON(object: any): PollData_Design_PollDesign_Background {
    const message = {
      ...basePollData_Design_PollDesign_Background,
    } as PollData_Design_PollDesign_Background;
    if (object.type !== undefined && object.type !== null) {
      message.type = pollData_Design_PollDesign_Background_TypeFromJSON(object.type);
    } else {
      message.type = 0;
    }
    if (object.color !== undefined && object.color !== null) {
      message.color = String(object.color);
    } else {
      message.color = undefined;
    }
    if (object.image !== undefined && object.image !== null) {
      message.image = Media.fromJSON(object.image);
    } else {
      message.image = undefined;
    }
    if (object.gradient !== undefined && object.gradient !== null) {
      message.gradient = PollData_Design_PollDesign_Background_Gradient.fromJSON(object.gradient);
    } else {
      message.gradient = undefined;
    }
    return message;
  },

  toJSON(message: PollData_Design_PollDesign_Background): unknown {
    const obj: any = {};
    message.type !== undefined &&
      (obj.type = pollData_Design_PollDesign_Background_TypeToJSON(message.type));
    message.color !== undefined && (obj.color = message.color);
    message.image !== undefined &&
      (obj.image = message.image ? Media.toJSON(message.image) : undefined);
    message.gradient !== undefined &&
      (obj.gradient = message.gradient
        ? PollData_Design_PollDesign_Background_Gradient.toJSON(message.gradient)
        : undefined);
    return obj;
  },
};

const basePollData_Design_PollDesign_Background_Gradient: object = {};

export const PollData_Design_PollDesign_Background_Gradient = {
  fromJSON(object: any): PollData_Design_PollDesign_Background_Gradient {
    const message = {
      ...basePollData_Design_PollDesign_Background_Gradient,
    } as PollData_Design_PollDesign_Background_Gradient;
    if (object.angle !== undefined && object.angle !== null) {
      message.angle = Number(object.angle);
    } else {
      message.angle = undefined;
    }
    if (object.startColor !== undefined && object.startColor !== null) {
      message.startColor = String(object.startColor);
    } else {
      message.startColor = undefined;
    }
    if (object.lastColor !== undefined && object.lastColor !== null) {
      message.lastColor = String(object.lastColor);
    } else {
      message.lastColor = undefined;
    }
    return message;
  },

  toJSON(message: PollData_Design_PollDesign_Background_Gradient): unknown {
    const obj: any = {};
    message.angle !== undefined && (obj.angle = message.angle);
    message.startColor !== undefined && (obj.startColor = message.startColor);
    message.lastColor !== undefined && (obj.lastColor = message.lastColor);
    return obj;
  },
};

const basePollData_Design_OptionDesign: object = {};

export const PollData_Design_OptionDesign = {
  fromJSON(object: any): PollData_Design_OptionDesign {
    const message = { ...basePollData_Design_OptionDesign } as PollData_Design_OptionDesign;
    if (object.borderRadius !== undefined && object.borderRadius !== null) {
      message.borderRadius = Number(object.borderRadius);
    } else {
      message.borderRadius = undefined;
    }
    return message;
  },

  toJSON(message: PollData_Design_OptionDesign): unknown {
    const obj: any = {};
    message.borderRadius !== undefined && (obj.borderRadius = message.borderRadius);
    return obj;
  },
};
