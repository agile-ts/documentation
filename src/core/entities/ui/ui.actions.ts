import { THEME, THEME_TYPE } from "./ui.controller";
import theme from "./theme";
import { ThemeInterface } from "./ui.interface";

export const toggleTheme = (dark: boolean): void => {
  THEME_TYPE.set(dark ? "dark" : "light");
};

export const mutateThemeCssProperties = (theme: ThemeInterface): void => {
  document.documentElement.style.setProperty(
    "--ifm-background-color",
    theme.background
  );
  document.documentElement.style.setProperty(
    "--ifm-background-color-light",
    theme.background_2
  );
  document.documentElement.style.setProperty(
    "--ifm-background-color-lighter",
    theme.background_3
  );
  document.documentElement.style.setProperty(
    "--ifm-font-color-base",
    theme.on_background
  );
};
