// File got generated with 'yarn run swizzle @docusaurus/theme-classic Layout --danger'
// To add toast into a component that is used on each site

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {useCallback, useState, useEffect} from 'react';
import clsx from 'clsx';
import SearchBar from '@theme/SearchBar';
import Toggle from '@theme/Toggle';
import useThemeContext from '@theme/hooks/useThemeContext';
import useLockBodyScroll from '@theme/hooks/useLockBodyScroll';
import useWindowSize, {windowSizes} from '@theme/hooks/useWindowSize';
import NavbarItem from '@theme/NavbarItem';
import Logo from '@theme/Logo';
import styles from './styles.module.css';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"; // retrocompatible with v1
import IconMenu from '@theme/IconMenu';
import {useHistory} from "react-router-dom";
import {FaDiscord, FaGithub} from "react-icons/all";

const DefaultNavItemPosition = 'right'; // If split links by left/right
// if position is unspecified, fallback to right (as v1)

function splitNavItemsByPosition(items) {
    const leftItems = items.filter(item => (item.position ?? DefaultNavItemPosition) === 'left');
    const rightItems = items.filter(item => (item.position ?? DefaultNavItemPosition) === 'right');
    return {
        leftItems,
        rightItems
    };
}

function Navbar(): JSX.Element {
    const {siteConfig} = useDocusaurusContext();
    const {items} = siteConfig.themeConfig.navbar;
    const [sidebarShown, setSidebarShown] = useState(false);
    const [isSearchBarExpanded, setIsSearchBarExpanded] = useState(false);

    useLockBodyScroll(sidebarShown);
    const history = useHistory();

    const {
        isDarkTheme,
        setLightTheme,
        setDarkTheme
    } = useThemeContext();

    const showSidebar = useCallback(() => {
        setSidebarShown(true);
    }, []);

    const hideSidebar = useCallback(() => {
        setSidebarShown(false);
    }, []);

    const onToggleChange = useCallback(e => e.target.checked ? setDarkTheme() : setLightTheme(), [setLightTheme, setDarkTheme]);

    const windowSize = useWindowSize();

    useEffect(() => {
        if (windowSize === windowSizes.desktop) {
            setSidebarShown(false);
        }
    }, [windowSize]);

    const {
        leftItems,
        rightItems
    } = splitNavItemsByPosition(items);


    const QuickSocialLinksComponent = (props: { className?: string }): JSX.Element => {
        const {className} = props;
        return (
            <div className={clsx(className, styles.iconContainer)}>
                <FaGithub className={styles.icon} onClick={() => {
                    window.location.href = siteConfig.customFields.githubUrl;
                }}/>
                <FaDiscord className={styles.icon} onClick={() => {
                    window.location.href = siteConfig.customFields.discordUrl;
                }}/>
            </div>
        );
    }

    return (
        <nav
            className={clsx('navbar', 'navbar--fixed-top', {
                'navbar-sidebar--show': sidebarShown,
            })}
        >

            {/* Navbar */}
            <div className={clsx("navbar__inner", styles.inner)}>
                <div className="navbar__items">
                    <Logo
                        className="navbar__brand"
                        imageClassName="navbar__logo"
                        titleClassName={clsx('navbar__title', {
                            [styles.hideLogoText]: isSearchBarExpanded
                        })}
                    />
                    <a
                        className={clsx("navbar__brand", styles.brandText)}
                        onClick={() => history.push("/")}
                    >
                        {siteConfig.title}
                    </a>
                    {leftItems.map((item, i) => <NavbarItem {...item} key={i}/>)}
                </div>
                <div className="navbar__items navbar__items--right">

                    {rightItems.map((item, i) => <NavbarItem {...item} key={i}/>)}
                    <QuickSocialLinksComponent className={styles.displayOnlyInLargeViewport}/>
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
            </div>

            {/* Donut */}
            {
                items != null && items.length !== 0 &&
                <div
                    aria-label="Navigation bar toggle"
                    className="navbar__toggle"
                    role="button"
                    tabIndex={0}
                    onClick={showSidebar}
                    onKeyDown={showSidebar}
                >
                    <IconMenu/>
                </div>
            }

            {/* Sidebar */}
            <div
                role="presentation"
                className="navbar-sidebar__backdrop"
                onClick={hideSidebar}
            />
            <div className="navbar-sidebar">
                <div className="navbar-sidebar__brand">
                    <a
                        className={clsx("navbar__brand", styles.brand, styles.siteBarBrand)}
                        href="/"
                    >
                        {siteConfig.title}
                    </a>
                    <QuickSocialLinksComponent/>
                </div>
                <div className="navbar-sidebar__items">
                    <div className="menu">
                        <ul className="menu__list">
                            {items.map((item, i) => <NavbarItem mobile {...item} onClick={hideSidebar} key={i}/>)}
                        </ul>
                    </div>
                </div>
            </div>

        </nav>
    );
}

export default Navbar;