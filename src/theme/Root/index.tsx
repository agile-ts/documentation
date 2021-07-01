import React, { useLayoutEffect } from 'react';
import useKeyboardNavigation from '@theme/hooks/useKeyboardNavigation';
import { onServer } from '../../utils';

// https://docusaurus.io/docs/using-themes#wrapper-your-site-with-root
const Root: React.FC = (props) => {
  // Allow navigating with the Keyboard
  useKeyboardNavigation();

  useLayoutEffect(() => {
    // Because 'WebFont.load' does accesses 'window',
    // which doesn't exist on the server
    if (!onServer()) {
      const WebFont = require('webfontloader');

      // Load Font
      WebFont.load({
        google: {
          families: ['Roboto'],
        },
      });
    }
  }, []);

  return <>{props.children}</>;
};

export default Root;
