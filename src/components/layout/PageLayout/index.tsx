import React, { ComponentProps, useEffect } from 'react';
import LayoutProviders from '@theme/LayoutProviders';
import useKeyboardNavigation from '@theme/hooks/useKeyboardNavigation';
import { ThemeProvider } from 'styled-components';
import core from '../../../core';
import { useAgile } from '@agile-ts/react';
import { ToastContainer } from 'react-toastify';
import Head from '@docusaurus/Head';
import AnnouncementBar from '@theme/AnnouncementBar';
import Navbar from '@theme/Navbar';
import Footer from '@theme/Footer';
import clsx from 'clsx';
import styles from './styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import { MetadataContextProvider } from '../../../hooks/useMetadataContext';

type Props = {
  canonical?: string;
  altFooter: boolean;
} & ComponentProps<typeof Layout>;

const PageLayout: React.FC<Props> = (props) => {
  const {
    children,
    noFooter,
    wrapperClassName,
    title,
    image,
    description,
    permalink,
    keywords,
    altFooter,
  } = props;
  const canonical = props.canonical || ''; // https://de.ryte.com/wiki/Canonical_Tag
  const { siteConfig } = useDocusaurusContext();
  const {
    title: siteTitle,
    themeConfig: { image: defaultImage },
    url: siteUrl,
    customFields: { subtitle },
  } = siteConfig;

  const metaTitle =
    title != null ? `${title} | ${subtitle}` : `${siteTitle} | ${subtitle}`;
  const metaImage = image ?? defaultImage;
  const metaImageUrl = useBaseUrl(metaImage, { absolute: true });
  const isBlogPost =
    description?.match(/^Blog/g) == null && wrapperClassName === 'blog-wrapper';

  // Allow navigating with the Keyboard
  useKeyboardNavigation();

  // Handle styled components theme
  const theme = useAgile(core.ui.THEME);
  useEffect(() => {
    core.ui.assignDefaultCssProperties(theme);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <MetadataContextProvider value={{ altFooter, isBlogPost }}>
        <LayoutProviders>
          <Head>
            <title>{metaTitle}</title>
            {permalink != null && (
              <link rel="canonical" href={`${siteUrl}${permalink}/`} />
            )}
            {permalink == null && canonical != null && (
              <link rel="canonical" href={`${siteUrl}${canonical}/`} />
            )}
            <meta property="og:image" content={metaImageUrl} />
            {permalink != null && (
              <meta property="og:url" content={`${siteUrl}${permalink}/`} />
            )}
            {permalink == null && canonical != null && (
              <meta property="og:url" content={`${siteUrl}${canonical}/`} />
            )}
            <meta property="og:title" content={metaTitle} />
            <meta name="twitter:image" content={metaImageUrl} />
            {description != null && (
              <meta name="description" content={description} />
            )}
            {description != null && (
              <meta name="twitter:description" content={description} />
            )}
            {description != null && (
              <meta property="og:description" content={description} />
            )}
            <meta name="twitter:title" content={metaTitle} />
            <meta
              name="twitter:image:alt"
              content={`Image for "${metaTitle}"`}
            />
            {keywords != null && keywords.length > 0 && (
              <meta name="keywords" content={keywords.join(',')} />
            )}
          </Head>

          <ToastContainer />
          <AnnouncementBar />
          <Navbar />

          <div className={clsx(styles.Wrapper, wrapperClassName)}>
            {children}
          </div>

          {!noFooter && <Footer />}
        </LayoutProviders>
      </MetadataContextProvider>
    </ThemeProvider>
  );
};

export default PageLayout;
