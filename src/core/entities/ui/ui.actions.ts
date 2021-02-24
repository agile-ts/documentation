import { ASTRONAUT_DARK, THEME_TYPE } from './ui.controller';
import { ThemeInterface } from './ui.interface';

export const toggleTheme = (dark: boolean): void => {
  THEME_TYPE.set(dark ? 'dark' : 'light');
};

export const toggleAstronautColor = (dark: boolean): void => {
  ASTRONAUT_DARK.set(dark);
};

export const mutateThemeCssProperties = (theme: ThemeInterface): void => {
  document.documentElement.style.setProperty(
    '--ifm-background-color',
    theme.colors.background
  );
  document.documentElement.style.setProperty(
    '--ifm-background-color-light',
    theme.colors.background_2
  );
  document.documentElement.style.setProperty(
    '--ifm-background-color-lighter',
    theme.colors.background_3
  );
  document.documentElement.style.setProperty(
    '--ifm-font-color-base',
    theme.colors.on_background
  );
};

export const assignDefaultCssProperties = (theme: ThemeInterface): void => {
  mutateThemeCssProperties(theme);

  // Assign Colors to css
  document.documentElement.style.setProperty(
    '--ifm-color-primary',
    theme.primitiveColors.purple
  );
  document.documentElement.style.setProperty(
    '--ifm-color-primary-dark',
    theme.primitiveColors.purpleDark
  );
  document.documentElement.style.setProperty(
    '--ifm-color-primary-darker',
    theme.primitiveColors.purpleDarker
  );
  document.documentElement.style.setProperty(
    '--ifm-color-primary-darkest',
    theme.primitiveColors.purpleDarkest
  );
  document.documentElement.style.setProperty(
    '--ifm-color-primary-light',
    theme.primitiveColors.purpleLight
  );
  document.documentElement.style.setProperty(
    '--ifm-color-primary-lighter',
    theme.primitiveColors.purpleLighter
  );
  document.documentElement.style.setProperty(
    '--ifm-color-primary-lightest',
    theme.primitiveColors.purpleLightest
  );
};
