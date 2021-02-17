import { ThemeInterface } from "../ui.interface";

export const colors = {
  black: "#18191a",
  blackLight: "#202026",
  blackLighter: "#2a2a32",
  white: "#ffffff",
  whiteDark: "#e6e6fd",
  whiteDarker: "#c5c5e9",
  purpleLightest: "#9C9ABF",
  purpleLighter: "#8481AF",
  purpleLight: "#7C79AA",
  purple: "#6C69A0",
  purpleDark: "#5F5C92",
  purpleDarker: "#5A578A",
  purpleDarkest: "#4A4872",
  orange: "#EE8030",
  green: "#00CCB1",
  greenDark: "#00B89F",
  red: "#FF6262",
  redDark: "#DE5B5B",
  yellow: "#FEEC4C",
  grayDarkest: "#262630",
  grayDark: "#3c3c4c",
};

// Assign Colors to css
document.documentElement.style.setProperty(
  "--ifm-color-primary",
  colors.purple
);
document.documentElement.style.setProperty(
  "--ifm-color-primary-dark",
  colors.purpleDark
);
document.documentElement.style.setProperty(
  "--ifm-color-primary-darker",
  colors.purpleDarker
);
document.documentElement.style.setProperty(
  "--ifm-color-primary-darkest",
  colors.purpleDarkest
);
document.documentElement.style.setProperty(
  "--ifm-color-primary-light",
  colors.purpleLight
);
document.documentElement.style.setProperty(
  "--ifm-color-primary-lighter",
  colors.purpleLighter
);
document.documentElement.style.setProperty(
  "--ifm-color-primary-lightest",
  colors.purpleLightest
);

const darkTheme: ThemeInterface = {
  // Background
  background: colors.black,
  background_2: colors.blackLight,
  background_3: colors.blackLighter,
  on_background: colors.white,
  on_background_2: colors.purpleLightest,
  on_background_3: colors.purpleLight,

  // Surface
  surface: colors.grayDarkest,
  surface_2: colors.grayDark,
  on_surface: colors.white,
  on_surface_2: colors.purpleLightest,
  on_surface_3: colors.purpleLighter,

  // Success
  success: colors.green,
  on_success: colors.black,

  // Error
  error: colors.red,
  on_error: colors.black,
};

const lightTheme: ThemeInterface = {
  // Background
  background: colors.white,
  background_2: colors.whiteDark,
  background_3: colors.whiteDarker,
  on_background: colors.black,
  on_background_2: colors.purpleDarkest,
  on_background_3: colors.purpleDarker,

  // Surface
  surface: colors.whiteDark,
  surface_2: colors.whiteDarker,
  on_surface: colors.black,
  on_surface_2: colors.purpleDarkest,
  on_surface_3: colors.purpleDarker,

  // Success
  success: colors.greenDark,
  on_success: colors.white,

  // Error
  error: colors.redDark,
  on_error: colors.white,
};

export const themes = {
  dark: darkTheme,
  light: lightTheme,
};

const baseFontSizes = {
  12: ".75rem",
  14: ".875rem",
  16: "1rem",
  18: "1.125rem",
  20: "1.25rem",
  24: "1.5rem",
  28: "1.75rem",
  30: "1.875rem",
  32: "2rem",
  36: "2.25rem",
  40: "2.5rem",
  48: "3rem",
  56: "3.5rem",
  64: "4rem",
  72: "4.5rem",
};

const fontSizes = {
  ...baseFontSizes,
  small: baseFontSizes[14],
  body: baseFontSizes[16],
  large: baseFontSizes[20],
  display: baseFontSizes[48],
  displaySmall: baseFontSizes[24],
  displayLarge: baseFontSizes[72],
};

const theme = {
  colors,
  themes,
  fontSizes,
};

export default theme;
