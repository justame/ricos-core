import type {
  AvailableExperiments,
  RichContentTheme,
  PaletteColors,
  RicosCustomStyles,
  RicosSettingsStyles,
  RicosOneAppStyles,
  ThemeData,
} from 'ricos-types';
import type { CSSProperties, ReactElement } from 'react';
import type { BasePlugin } from '../types';
export type RicosCssOverride = RichContentTheme;

export interface WixColor {
  name: string;
  reference: string;
  value: string;
}

/** Ricos can work with a Wix Palette object */
export type WixPalette = WixColor[];

export type PalettePreset = 'darkTheme';

export interface RicosTypography {
  /**
   * WixTypography - work in progress.
   * This field is ineffective at the moment.
   */
  wixTypography?: WixTypography;
  fontFamily?: CSSProperties['fontFamily'];
}

export interface WixTypography {
  Title: WixTypographyDefinition;
  Menu: WixTypographyDefinition;
  'Page-title': WixTypographyDefinition;
  'Heading-XL': WixTypographyDefinition;
  'Heading-L': WixTypographyDefinition;
  'Heading-M': WixTypographyDefinition;
  'Heading-S': WixTypographyDefinition;
  'Body-L': WixTypographyDefinition;
  'Body-M': WixTypographyDefinition;
  'Body-S': WixTypographyDefinition;
  'Body-XS': WixTypographyDefinition;
}

export interface WixTypographyDefinition {
  editorKey: string;
  lineHeight: string;
  style: string;
  weight: string;
  size: string;
  fontFamily: string;
  value: string; // contains all of the above information (except editorKey), ready for css `font` value
}

export interface RicosTheme {
  /** You'll have to specify a parent `className` if you plan to apply different palettes for multiple
   * Ricos instances living next to each other.
   * {@link https://wix.github.io/ricos/docs/ricos/ricos-api/#theme Read More}.
   *
   * Otherwise, you can ignore this field.
   * @example
   * ```js
   * <div className='class1'>
   *  <RicosEditor theme={{ parentClass: 'class1', palette: lightPalette }} />
   * </div>
   * <div className='class2'>
   *  <RicosEditor theme={{ parentClass: 'class2', palette: darkPalette }} />
   * </div>
   * ```
   * */
  parentClass?: string;
  palette?: PaletteColors | WixPalette | PalettePreset;
  paletteConfig?: PaletteConfig;
  typography?: RicosTypography;
  customStyles?: RicosCustomStyles;
  settingsStyles?: RicosSettingsStyles;
  oneAppStyles?: RicosOneAppStyles;
}

export interface PaletteConfig {
  /**
   * When `true`, attribute `bgColor` provided in `palette` will be the
   * `background-color` of the inner content container of Ricos.
   *
   * Default: `false`
   */
  contentBgColor?: boolean;
  /** Override the `actionColor` of floating panels, toolbars & settings modals.
   *
   * **Note:** `RicosEditor` only.
   * @default actionColor
   */
  settingsActionColor?: string;
  /** Override the `actionColor` of plugin when focused / clicked.
   *
   * **Note:** `RicosEditor` only.
   * @default actionColor
   */
  focusActionColor?: string;
}

export interface ThemeStrategyArgs {
  experiments?: AvailableExperiments;
  plugins?: BasePlugin[];
  cssOverride?: RicosCssOverride;
  ricosTheme?: RicosTheme;
}

export interface ThemeStrategyResult {
  theme: RicosCssOverride;
  html?: ReactElement;
  themeData: ThemeData;
}

export type CssVarsObject = Record<string, unknown>;
