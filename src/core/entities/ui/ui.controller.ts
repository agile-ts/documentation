import { App } from "../../app";
import { ThemeInterface, ThemeTypes } from "./ui.interface";
import theme from "./theme/theme";

export const THEME_TYPE = App.createState<ThemeTypes>("light").persist(
  "theme-type"
);
export const THEME = App.createState<ThemeInterface>(
  theme.themes[THEME_TYPE.value]
);
