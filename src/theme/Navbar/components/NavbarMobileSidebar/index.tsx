import React from 'react';
import styles from '../../styles.module.css';
import NavbarItem from '@theme/NavbarItem';
import {
  useColorModeToggle,
  useNavbarItems,
  useSecondaryMenu,
} from '../../controller';
import useLockBodyScroll from '@theme/hooks/useLockBodyScroll';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import Toggle from '@theme/Toggle';
import Logo from '@theme/Logo';
import IconClose from '@theme/IconClose';

export type NavbarMobileSidebarProps = {
  sidebarShown: boolean;
  toggleSidebar: () => void;
};

const NavbarMobileSidebar: React.FC<NavbarMobileSidebarProps> = (props) => {
  const { toggleSidebar, sidebarShown } = props;
  useLockBodyScroll(sidebarShown);
  const items = useNavbarItems();

  const colorModeToggle = useColorModeToggle();

  const secondaryMenu = useSecondaryMenu({
    sidebarShown,
    toggleSidebar,
  });

  return (
    <div className="navbar-sidebar">
      <div className="navbar-sidebar__brand">
        <Logo
          className="navbar__brand"
          imageClassName="navbar__logo"
          titleClassName="navbar__title"
        />
        {!colorModeToggle.disabled && (
          <Toggle
            className={styles.navbarSidebarToggle}
            checked={colorModeToggle.isDarkTheme}
            onChange={colorModeToggle.toggle}
          />
        )}
        <button
          type="button"
          className="clean-btn navbar-sidebar__close"
          onClick={toggleSidebar}>
          <IconClose
            color="var(--ifm-color-emphasis-600)"
            className={styles.navbarSidebarCloseSvg}
          />
        </button>
      </div>

      <div
        className={clsx('navbar-sidebar__items', {
          'navbar-sidebar__items--show-secondary': secondaryMenu.shown,
        })}>
        <div className="navbar-sidebar__item menu">
          <ul className="menu__list">
            {items.map((item, i) => (
              // @ts-ignore
              <NavbarItem mobile {...item} onClick={toggleSidebar} key={i} />
            ))}
          </ul>
        </div>

        <div className="navbar-sidebar__item menu">
          {items.length > 0 && (
            <button
              type="button"
              className="clean-btn navbar-sidebar__back"
              onClick={secondaryMenu.hide}>
              <Translate
                id="theme.navbar.mobileSidebarSecondaryMenu.backButtonLabel"
                description="The label of the back button to return to main menu, inside the mobile navbar sidebar secondary menu (notably used to display the docs sidebar)">
                ← Back to main menu
              </Translate>
            </button>
          )}
          {secondaryMenu.content}
        </div>
      </div>
    </div>
  );
};

export default NavbarMobileSidebar;
