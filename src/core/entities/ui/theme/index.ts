import {
  BaseFontSizesInterface,
  FontSizesInterface,
  PrimitiveColorsInterface,
  ThemeInterface,
} from '../ui.interface';

/*
  THIS THEME DOESN'T GET USED RIGHT NOW
  https://github.com/facebook/docusaurus/issues/3236
  CURRENT THEME IS IN 'custom.scss'
 */

export const primitiveColors: PrimitiveColorsInterface = {
  black: '#18191a',
  blackLight: '#202026',
  blackLighter: '#2a2a32',
  white: '#ffffff',
  whiteDark: '#e6e6fd',
  whiteDarker: '#c5c5e9',
  purpleLightest: '#9C9ABF',
  purpleLighter: '#8481AF',
  purpleLight: '#7C79AA',
  purple: '#6C69A0',
  purpleDark: '#5F5C92',
  purpleDarker: '#5A578A',
  purpleDarkest: '#4A4872',
  orange: '#EE8030',
  green: '#00CCB1',
  greenDark: '#00B89F',
  red: '#FF6262',
  redDark: '#DE5B5B',
  yellow: '#FEEC4C',
  grayDarkest: '#262630',
  grayDark: '#3c3c4c',
};

const baseFontSizes: BaseFontSizesInterface = {
  12: '.75rem',
  14: '.875rem',
  16: '1rem',
  18: '1.125rem',
  20: '1.25rem',
  24: '1.5rem',
  28: '1.75rem',
  30: '1.875rem',
  32: '2rem',
  36: '2.25rem',
  40: '2.5rem',
  48: '3rem',
  56: '3.5rem',
  64: '4rem',
  72: '4.5rem',
};

const fontSizes: FontSizesInterface = {
  ...baseFontSizes,
  small: baseFontSizes[14],
  body: baseFontSizes[16],
  large: baseFontSizes[20],
  display: baseFontSizes[48],
  displaySmall: baseFontSizes[24],
  displayLarge: baseFontSizes[72],
};

const darkTheme: ThemeInterface = {
  fontSizes,
  primitiveColors,
  colors: {
    // Primary
    primary: primitiveColors.purpleLight,
    primary_2: primitiveColors.purpleLighter,
    on_primary: primitiveColors.black,

    // Background
    background: primitiveColors.black,
    background_2: primitiveColors.blackLight,
    background_3: primitiveColors.blackLighter,
    on_background: primitiveColors.white,
    on_background_2: primitiveColors.purpleLightest,
    on_background_3: primitiveColors.purpleLight,

    // Surface
    surface: primitiveColors.grayDarkest,
    surface_2: primitiveColors.grayDark,
    on_surface: primitiveColors.white,
    on_surface_2: primitiveColors.purpleLightest,
    on_surface_3: primitiveColors.purpleLighter,

    // Success
    success: primitiveColors.green,
    on_success: primitiveColors.black,

    // Error
    error: primitiveColors.red,
    on_error: primitiveColors.black,
  },
};

const lightTheme: ThemeInterface = {
  fontSizes,
  primitiveColors,
  colors: {
    // Primary
    primary: primitiveColors.purpleDark,
    primary_2: primitiveColors.purpleDarker,
    on_primary: primitiveColors.white,

    // Background
    background: primitiveColors.white,
    background_2: primitiveColors.whiteDark,
    background_3: primitiveColors.whiteDarker,
    on_background: primitiveColors.black,
    on_background_2: primitiveColors.purpleDarkest,
    on_background_3: primitiveColors.purpleDarker,

    // Surface
    surface: primitiveColors.whiteDark,
    surface_2: primitiveColors.whiteDarker,
    on_surface: primitiveColors.black,
    on_surface_2: primitiveColors.purpleDarkest,
    on_surface_3: primitiveColors.purpleDarker,

    // Success
    success: primitiveColors.greenDark,
    on_success: primitiveColors.white,

    // Error
    error: primitiveColors.redDark,
    on_error: primitiveColors.white,
  },
};

const theme = {
  themes: {
    dark: darkTheme,
    light: lightTheme,
  },
  primitiveColors,
  fontSizes,
};

export default theme;
