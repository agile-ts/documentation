// Created this Layout to have a Custom Head on the LandingPage

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

type Props = {
  canonical?: string;
} & ComponentProps<typeof Layout>;

const PageLayout: React.FC<Props> = (props) => {
  const {
    children,
    noFooter,
    wrapperClassName,
    title,
    image,
    permalink,
    keywords,
  } = props;
  const { siteConfig } = useDocusaurusContext();
  const {
    favicon,
    title: siteTitle,
    url: siteUrl,
    customFields: {
      meta: {
        title: metaTitle,
        description: metaDescription,
        image: metaImage,
        color: metaColor,
      },
    },
  } = siteConfig;
  const canonical = props.canonical || ''; // https://de.ryte.com/wiki/Canonical_Tag
  const description = props.description || metaDescription;
  const finalTitle = title
    ? `${title} | ${metaTitle}`
    : `${siteTitle} | ${metaTitle}`;
  const metaImagePath = image ?? metaImage;
  const metaImageUrl = useBaseUrl(metaImagePath, { absolute: true });
  const metaFaviconUrl = useBaseUrl(favicon);

  // Allow navigating with the Keyboard
  useKeyboardNavigation();

  // Handle styled components theme
  const theme = useAgile(core.ui.THEME);
  useEffect(() => {
    core.ui.assignDefaultCssProperties(theme);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <LayoutProviders>
        <Head>
          {/* Title */}
          {finalTitle && <title>{finalTitle}</title>}
          {finalTitle && <meta property="og:title" content={finalTitle} />}
          {finalTitle && <meta name="twitter:title" content={finalTitle} />}

          {/* Color */}
          {metaColor && <meta name="theme-color" content={metaColor} />}

          {/* Icon */}
          {favicon && <link rel="shortcut icon" href={metaFaviconUrl} />}

          {/* Permalink */}
          {permalink && (
            <link rel="canonical" href={`${siteUrl}${permalink}/`} />
          )}
          {permalink && (
            <meta property="og:url" content={`${siteUrl}${permalink}/`} />
          )}
          {!permalink && canonical && (
            <link rel="canonical" href={`${siteUrl}${canonical}/`} />
          )}
          {!permalink && canonical && (
            <meta property="og:url" content={`${siteUrl}${canonical}/`} />
          )}

          {/* Description */}
          {description && <meta name="description" content={metaDescription} />}
          {description && (
            <meta property="og:description" content={metaDescription} />
          )}
          {metaDescription && (
            <meta name="twitter:description" content={metaDescription} />
          )}

          {/* Image */}
          {metaImagePath && <meta property="og:image" content={metaImageUrl} />}
          {metaImagePath && (
            <meta name="twitter:image" content={metaImageUrl} />
          )}
          {metaImagePath && (
            <meta
              name="twitter:image:alt"
              content={`Image for "${metaTitle}"`}
            />
          )}
          {/* Makes Image Large */}
          <meta name="twitter:card" content="summary_large_image" />

          {/* Keywords */}
          {keywords && keywords.length > 0 && (
            <meta name="keywords" content={keywords.join(',')} />
          )}
        </Head>

        <ToastContainer />
        <AnnouncementBar />
        <Navbar />

        <div className={clsx(styles.Wrapper, wrapperClassName)}>{children}</div>

        {!noFooter && <Footer />}
      </LayoutProviders>
    </ThemeProvider>
  );
};

export default PageLayout;
