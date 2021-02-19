import { App } from '../../app';
import { ThemeInterface, ThemeTypes } from './ui.interface';
import theme from './theme';
import { mutateThemeCssProperties } from './ui.actions';

export const THEME_TYPE = App.createState<ThemeTypes>('light')
  .persist('theme')
  .watch('mutateColor', (value) => {
    THEME.set(theme.themes[value]);
  });

export const THEME = App.createState<ThemeInterface>(
  theme.themes[THEME_TYPE.value]
).watch('mutateColor', (value) => {
  mutateThemeCssProperties(value);
});
