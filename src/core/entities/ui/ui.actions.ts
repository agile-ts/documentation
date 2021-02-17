import { THEME_TYPE } from "./ui.controller";
import { ThemeInterface } from "./ui.interface";

export const toggleTheme = (dark: boolean): void => {
  THEME_TYPE.set(dark ? "dark" : "light");
};

export const mutateThemeCssProperties = (theme: ThemeInterface): void => {
  document.documentElement.style.setProperty(
    "--ifm-background-color",
    theme.colors.background
  );
  document.documentElement.style.setProperty(
    "--ifm-background-color-light",
    theme.colors.background_2
  );
  document.documentElement.style.setProperty(
    "--ifm-background-color-lighter",
    theme.colors.background_3
  );
  document.documentElement.style.setProperty(
    "--ifm-font-color-base",
    theme.colors.on_background
  );
};
