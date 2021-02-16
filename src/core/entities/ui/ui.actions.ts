import { THEME_TYPE } from "./ui.controller";

export const toggleTheme = (dark: boolean): void => {
  THEME_TYPE.set(dark ? "dark" : "light");
};
