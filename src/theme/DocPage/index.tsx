// File got generated with 'yarn run swizzle @docusaurus/theme-classic DocPage --danger'

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState, useCallback, TransitionEvent } from 'react';
import { MDXProvider } from '@mdx-js/react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import renderRoutes from '@docusaurus/renderRoutes';
import Layout from '@theme/Layout';
import DocSidebar from '@theme/DocSidebar';
import MDXComponents from '@theme/MDXComponents';
import NotFound from '@theme/NotFound';
import IconArrow from '@theme/IconArrow';
import { matchPath } from '@docusaurus/router';
import clsx from 'clsx';
import styles from './styles.module.css';
import { docVersionSearchTag } from '@docusaurus/theme-common';

const DocPageContent = ({ currentDocRoute, versionMetadata, children }) => {
  const { siteConfig, isClient } = useDocusaurusContext();
  const {
    pluginId,
    permalinkToSidebar,
    docsSidebars,
    version,
  } = versionMetadata;
  const sidebarName = permalinkToSidebar[currentDocRoute.path];
  const sidebar = docsSidebars[sidebarName];
  const [hiddenSidebarContainer, setHiddenSidebarContainer] = useState(false);
  const [hiddenSidebar, setHiddenSidebar] = useState(false);

  const toggleSidebar = useCallback(() => {
    if (hiddenSidebar) {
      setHiddenSidebar(false);
    }

    setHiddenSidebarContainer(!hiddenSidebarContainer);
  }, [hiddenSidebar]);

  const handleTransitionEnd = useCallback(
    (event: TransitionEvent<HTMLDivElement>) => {
      if (!event.currentTarget.classList.contains(styles.docSidebarContainer)) {
        return;
      }

      if (hiddenSidebarContainer) {
        setHiddenSidebar(true);
      }
    },
    [hiddenSidebarContainer, setHiddenSidebar]
  );

  return (
    <Layout
      key={isClient}
      wrapperClassName="main-docs-wrapper"
      searchMetadatas={{
        version,
        tag: docVersionSearchTag(pluginId, version),
      }}>
      <div className={styles.docPage}>
        {/* Sidebar */}
        {sidebar && (
          <div
            className={clsx(styles.docSidebarContainer, {
              [styles.docSidebarContainerHidden]: hiddenSidebarContainer,
            })}
            onTransitionEnd={handleTransitionEnd}
            role="complementary">
            <DocSidebar
              key={
                // Reset sidebar state on sidebar changes
                // See https://github.com/facebook/docusaurus/issues/3414
                sidebarName
              }
              sidebar={sidebar}
              path={currentDocRoute.path}
              sidebarCollapsible={
                siteConfig.themeConfig?.sidebarCollapsible ?? true
              }
              onCollapse={toggleSidebar}
              isHidden={hiddenSidebar}
            />

            {hiddenSidebar && (
              <div
                className={styles.collapsedDocSidebar}
                title={'Expand sidebar'}
                aria-label={'Expand sidebar'}
                tabIndex={0}
                role="button"
                onKeyDown={toggleSidebar}
                onClick={toggleSidebar}>
                <IconArrow className={styles.expandSidebarButtonIcon} />
              </div>
            )}
          </div>
        )}

        {/* Doc Content */}
        <main
          className={clsx(styles.docMainContainer, {
            [styles.docMainContainerEnhanced]: hiddenSidebarContainer,
          })}>
          <div
            className={clsx(
              'padding-vert--lg',
              'container',
              styles.docItemWrapper,
              {
                [styles.docItemWrapperEnhanced]: hiddenSidebarContainer,
              }
            )}>
            <MDXProvider components={MDXComponents}>{children}</MDXProvider>
          </div>
        </main>
      </div>
    </Layout>
  );
};

const DocPage = (props) => {
  const {
    route: { routes: docRoutes },
    versionMetadata,
    location,
  } = props;
  const currentDocRoute = docRoutes.find((docRoute) =>
    matchPath(location.pathname, docRoute)
  );

  // Check if DocRoute exists
  if (!currentDocRoute) {
    return <NotFound {...props} />;
  }

  return (
    <DocPageContent
      currentDocRoute={currentDocRoute}
      versionMetadata={versionMetadata}>
      {renderRoutes(docRoutes)}
    </DocPageContent>
  );
};

export default DocPage;
