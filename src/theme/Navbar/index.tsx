// File got generated with 'yarn run swizzle @docusaurus/theme-classic Navbar --danger'

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useCallback, useState, useEffect } from 'react';
import clsx from 'clsx';
import SearchBar from '@theme/SearchBar';
import Toggle from '@theme/Toggle';
import useThemeContext from '@theme/hooks/useThemeContext';
import useLockBodyScroll from '@theme/hooks/useLockBodyScroll';
import useWindowSize, { windowSizes } from '@theme/hooks/useWindowSize';
import NavbarItem from '@theme/NavbarItem';
import Logo from '@theme/Logo';
import styles from './styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import IconMenu from '@theme/IconMenu';
import { useHistory } from 'react-router-dom';
import core from '../../core';
import { splitNavItemsByPosition } from './controller';
import QuickSocialLinksView from './components/QuickSocialLinksView';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Progressbar from './components/Progressbar';

const Navbar: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const { items } = siteConfig.themeConfig.navbar;
  const [sidebarShown, setSidebarShown] = useState(false);
  const [isSearchBarExpanded, setIsSearchBarExpanded] = useState(false);
  const windowSize = useWindowSize();
  const { leftItems, rightItems } = splitNavItemsByPosition(items);
  const { isDarkTheme, setLightTheme, setDarkTheme } = useThemeContext();
  const history = useHistory();

  useLockBodyScroll(sidebarShown);

  const showSidebar = useCallback(() => {
    setSidebarShown(true);
  }, []);

  const hideSidebar = useCallback(() => {
    setSidebarShown(false);
  }, []);

  const onToggleChange = useCallback(
    (e) => {
      if (e.target.checked) {
        setDarkTheme();
        core.ui.toggleTheme(true);
      } else {
        setLightTheme();
        core.ui.toggleTheme(false);
      }
    },
    [setLightTheme, setDarkTheme]
  );

  useEffect(() => {
    if (windowSize === windowSizes.desktop) {
      setSidebarShown(false);
    }
  }, [windowSize]);

  return (
    <nav
      className={clsx('navbar', 'navbar--fixed-top', {
        'navbar-sidebar--show': sidebarShown,
      })}>
      {/* Navbar */}
      <div className={clsx('navbar__inner', styles.InnerContainer)}>
        <div className="navbar__items">
          <Logo
            className="navbar__brand"
            imageClassName="navbar__logo"
            titleClassName="navbar__title"
          />
          <a
            className={clsx('navbar__brand', styles.BrandText)}
            onClick={() => history.push('/')}>
            {siteConfig.title}
          </a>
          {leftItems.map((item, i) => (
            <NavbarItem {...item} key={i} />
          ))}
        </div>
        <div className="navbar__items navbar__items--right">
          {rightItems.map((item, i) => (
            <NavbarItem {...item} key={i} />
          ))}
          <QuickSocialLinksView className={styles.displayOnlyInLargeViewport} />
          <Toggle
            aria-label="Dark mode toggle"
            checked={isDarkTheme}
            onChange={onToggleChange}
          />
          <SearchBar
            handleSearchBarToggle={setIsSearchBarExpanded}
            isSearchBarExpanded={isSearchBarExpanded}
          />
        </div>
        <BrowserOnly>{() => <Progressbar />}</BrowserOnly>
      </div>

      {/* Donut */}
      {items != null && items.length !== 0 && (
        <div
          aria-label="Navigation bar toggle"
          className="navbar__toggle"
          role="button"
          tabIndex={0}
          onClick={showSidebar}
          onKeyDown={showSidebar}>
          <IconMenu />
        </div>
      )}

      {/* Sidebar */}
      <div
        role="presentation"
        className="navbar-sidebar__backdrop"
        onClick={hideSidebar}
      />
      <div className="navbar-sidebar">
        <div className="navbar-sidebar__brand">
          <a className={clsx('navbar__brand', styles.BrandText)} href="/">
            {siteConfig.title}
          </a>
          <QuickSocialLinksView />
        </div>
        <div className="navbar-sidebar__items">
          <div className="menu">
            <ul className="menu__list">
              {items.map((item, i) => (
                <NavbarItem mobile {...item} onClick={hideSidebar} key={i} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
