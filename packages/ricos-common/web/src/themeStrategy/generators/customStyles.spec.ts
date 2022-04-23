import type { CssVarsObject } from '../themeTypes';
import { customStylesTestCase, expectedOutput } from '../../../tests/customStylesExamples';
import {
  customStylesTestCase as settingsTestCase,
  expectedOutput as settingsOutput,
} from '../../../tests/settingsStylesExamples';
import createCustomStyles from './customStyles';
import type { RicosCustomStyles, RicosSettingsStyles } from 'ricos-types';
import { merge } from 'lodash';

const makeCustomStyles = (customStyles?: RicosCustomStyles) => createCustomStyles({ customStyles });

const makeSettingsStyles = (settingsStyles?: RicosSettingsStyles) =>
  createCustomStyles({ settingsStyles });

describe('CustomTheme', () => {
  describe('Viewer Styles', () => {
    const mocks: { input?: RicosCustomStyles; output: CssVarsObject }[] = [
      { input: undefined, output: {} },
      { input: {}, output: {} },
      {
        input: customStylesTestCase as RicosCustomStyles,
        output: expectedOutput,
      },
    ];

    it('should return empty object if customStyles is empty / undefined', () => {
      const cssVars1 = makeCustomStyles(mocks[0].input);
      const cssVars2 = makeCustomStyles(mocks[1].input);
      expect(cssVars1).toEqual({});
      expect(cssVars2).toEqual({});
    });

    it('should apply customStyles', () => {
      const cssVars = makeCustomStyles(mocks[2].input);
      expect(cssVars).toStrictEqual(mocks[2].output);
    });

    it('should set lineHeight to 1.5 under the right condition', () => {
      const cssVars1 = makeCustomStyles({ h2: { fontSize: '40px' } });
      expect(cssVars1).toStrictEqual({
        'custom-h2-fontSize': '40px',
        'custom-h2-lineHeight': 1.5,
      });

      const cssVars2 = makeCustomStyles({ h2: { fontSize: '40px', lineHeight: 2 } });
      expect(cssVars2).toStrictEqual({
        'custom-h2-fontSize': '40px',
        'custom-h2-lineHeight': 2,
      });

      const cssVars3 = makeCustomStyles({ h2: { lineHeight: 2 } });
      expect(cssVars3).toStrictEqual({
        'custom-h2-fontSize': undefined,
        'custom-h2-lineHeight': 2,
      });
    });
  });
  describe('Editor Styles', () => {
    const mocks: { input?: RicosSettingsStyles; output: CssVarsObject }[] = [
      { input: undefined, output: {} },
      { input: {}, output: {} },
      {
        input: settingsTestCase as RicosSettingsStyles,
        output: settingsOutput,
      },
    ];

    it('should return empty object if customStyles is empty / undefined', () => {
      const cssVars1 = makeSettingsStyles(mocks[0].input);
      const cssVars2 = makeSettingsStyles(mocks[1].input);
      expect(cssVars1).toEqual({});
      expect(cssVars2).toEqual({});
    });

    it('should apply customStyles', () => {
      const cssVars = makeSettingsStyles(mocks[2].input);
      expect(cssVars).toStrictEqual(mocks[2].output);
    });
  });
  describe('Both', () => {
    it('should not interfere with each other', () => {
      const cssVars = createCustomStyles({
        customStyles: customStylesTestCase as RicosCustomStyles,
        settingsStyles: settingsTestCase as RicosSettingsStyles,
      });
      expect(cssVars).toStrictEqual(merge(expectedOutput, settingsOutput));
    });
  });
});
