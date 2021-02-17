// File got generated with 'yarn run swizzle @docusaurus/theme-classic Layout --danger'
// To add toast into a component that is used on each site

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect } from "react";
import LayoutProviders from "@theme/LayoutProviders";
import useKeyboardNavigation from "@theme/hooks/useKeyboardNavigation";
import styled, { ThemeProvider } from "styled-components";
import core from "../../core";
import { useAgile } from "@agile-ts/react";
import { ToastContainer } from "react-toastify";
import LayoutHead from "@theme/LayoutHead";
import SkipToContent from "@theme/SkipToContent";
import AnnouncementBar from "@theme/AnnouncementBar";
import Navbar from "@theme/Navbar";
import Footer from "@theme/Footer";

function Layout(props) {
  const { children, noFooter, wrapperClassName } = props;
  useKeyboardNavigation();

  const theme = useAgile(core.ui.THEME);

  useEffect(() => {
    core.ui.mutateThemeCssProperties(theme);
    core.ui.assignDefaultColors(theme);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <LayoutProviders>
        <ToastContainer />

        <LayoutHead {...props} />

        <SkipToContent />

        <AnnouncementBar />

        <Navbar />

        <Wrapper className={wrapperClassName}>{children}</Wrapper>

        {!noFooter && <Footer />}
      </LayoutProviders>
    </ThemeProvider>
  );
}

const Wrapper = styled.div`
  flex: 1 0 auto;
`;

export default Layout;
