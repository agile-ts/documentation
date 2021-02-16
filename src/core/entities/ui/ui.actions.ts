import { THEME } from "./ui.controller";

export const toggleTheme = (dark: boolean): void => {
  THEME.set(dark);
};
