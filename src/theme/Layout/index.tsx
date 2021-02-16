// File got generated with 'yarn run swizzle @docusaurus/theme-classic Layout --danger'
// To add toast into a component that is used on each site

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from "react";
import SkipToContent from "@theme/SkipToContent";
import AnnouncementBar from "@theme/AnnouncementBar";
import Navbar from "@theme/Navbar";
import Footer from "@theme/Footer";
import LayoutProviders from "@theme/LayoutProviders";
import LayoutHead from "@theme/LayoutHead";
import useKeyboardNavigation from "@theme/hooks/useKeyboardNavigation";
import { ToastContainer } from "react-toastify";
import styled, { ThemeProvider } from "styled-components";

function Layout(props) {
  const { children, noFooter, wrapperClassName } = props;
  useKeyboardNavigation();
  return (
    <LayoutProviders>
      <ThemeProvider theme={{}}>
        <ToastContainer />

        <LayoutHead {...props} />

        <SkipToContent />

        <AnnouncementBar />

        <Navbar />

        <Wrapper className={wrapperClassName}>{children}</Wrapper>

        {!noFooter && <Footer />}
      </ThemeProvider>
    </LayoutProviders>
  );
}

const Wrapper = styled.div`
  flex: 1 0 auto;
`;

export default Layout;
