import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useAgile } from '@agile-ts/react';
import core from '../../core';
import defaultTheme from 'prism-react-renderer/themes/palenight';

const usePrismTheme = () => {
  const { siteConfig } = useDocusaurusContext();
  const prismTheme = siteConfig.themeConfig.prism.theme;
  const lightModeTheme = prismTheme.theme || defaultTheme;
  const darkModeTheme = prismTheme.darkTheme || lightModeTheme;
  const themeType = useAgile(core.ui.THEME_TYPE);

  return themeType === 'dark' ? darkModeTheme : lightModeTheme;
};

export default usePrismTheme;
