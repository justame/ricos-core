import type { PalettePreset } from '../themeTypes';
import type { PaletteColors } from 'ricos-types';

const darkTheme: PaletteColors = {
  textColor: '#000000',
  bgColor: '#FFFFFF',
  actionColor: '#15E0FB',
};

const presets: { [propName in PalettePreset]: PaletteColors } = {
  darkTheme,
};

export default presets;
