// File got generated with 'yarn run swizzle @docusaurus/theme-classic Layout --danger'

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect } from 'react';
import LayoutProviders from '@theme/LayoutProviders';
import useKeyboardNavigation from '@theme/hooks/useKeyboardNavigation';
import { ThemeProvider } from 'styled-components';
import core from '../../core';
import { useAgile } from '@agile-ts/react';
import { ToastContainer } from 'react-toastify';
import LayoutHead from '@theme/LayoutHead';
import SkipToContent from '@theme/SkipToContent';
import AnnouncementBar from '@theme/AnnouncementBar';
import Navbar from '@theme/Navbar';
import Footer from '@theme/Footer';
import clsx from 'clsx';
import styles from './styles.module.css';

type Props = {
  noFooter?: boolean;
  wrapperClassName: string;
};

const Layout: React.FC<Props> = (props) => {
  const { children, noFooter, wrapperClassName } = props;
  useKeyboardNavigation();

  const theme = useAgile(core.ui.THEME);

  useEffect(() => {
    core.ui.assignDefaultCssProperties(theme);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <LayoutProviders>
        <ToastContainer />

        <LayoutHead {...props} />

        <SkipToContent />

        <AnnouncementBar />

        <Navbar />

        <div className={clsx(styles.Wrapper, wrapperClassName)}>{children}</div>

        {!noFooter && <Footer />}
      </LayoutProviders>
    </ThemeProvider>
  );
};

export default Layout;
