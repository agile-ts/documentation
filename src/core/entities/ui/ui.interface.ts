export type ThemeTypes = 'dark' | 'light' | string;

export interface PrimitiveColorsInterface {
  black: string;
  blackLight: string;
  blackLighter: string;
  white: string;
  whiteDark: string;
  whiteDarker: string;
  purpleLightest: string;
  purpleLighter: string;
  purpleLight: string;
  purple: string;
  purpleDark: string;
  purpleDarker: string;
  purpleDarkest: string;
  orange: string;
  green: string;
  greenDark: string;
  red: string;
  redDark: string;
  yellow: string;
  grayDarkest: string;
  grayDark: string;
}

export interface ColorsInterface {
  // Primary
  primary: string;
  primary_2: string;
  on_primary: string;

  // Background
  background: string;
  background_2: string;
  background_3: string;
  on_background: string;
  on_background_2: string;
  on_background_3: string;

  // Surface
  surface: string;
  surface_2: string;
  on_surface: string;
  on_surface_2: string;
  on_surface_3: string;

  // Success
  success: string;
  on_success: string;

  // Error
  error: string;
  on_error: string;
}

export interface BaseFontSizesInterface {
  12: string;
  14: string;
  16: string;
  18: string;
  20: string;
  24: string;
  28: string;
  30: string;
  32: string;
  36: string;
  40: string;
  48: string;
  56: string;
  64: string;
  72: string;
}

export interface FontSizesInterface extends BaseFontSizesInterface {
  small: string;
  body: string;
  large: string;
  display: string;
  displaySmall: string;
  displayLarge: string;
}

export interface ThemeInterface {
  colors: ColorsInterface;
  primitiveColors: PrimitiveColorsInterface;
  fontSizes: FontSizesInterface;
}
