import React, { useLayoutEffect } from 'react';
import WebFont from 'webfontloader';
import useKeyboardNavigation from '@theme/hooks/useKeyboardNavigation';

// https://docusaurus.io/docs/using-themes#wrapper-your-site-with-root
const Root: React.FC = (props) => {
  // Allow navigating with the Keyboard
  useKeyboardNavigation();

  useLayoutEffect(() => {
    // Load Font
    WebFont.load({
      google: {
        families: ['Roboto'],
      },
    });
  }, []);

  return <>{props.children}</>;
};

export default Root;
