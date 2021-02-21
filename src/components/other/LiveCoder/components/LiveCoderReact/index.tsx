import * as React from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import clsx from 'clsx';
import { PrismTheme } from 'prism-react-renderer';

import styles from './styles.module.css';

type Props = {
  code: string;
  theme?: PrismTheme;
  transformCode?: (code: string) => string;
};

const LiveCoderReact: React.FC<Props> = (props) => {
  const { code, theme, transformCode } = props;

  return (
    <LiveProvider
      code={code.replace(/\n$/, '')}
      transformCode={transformCode || ((code) => `${code};`)}
      theme={theme}
      noInline={true}>
      <div className={clsx(styles.Header, styles.EditorHeader)}>
        Live Editor
      </div>
      <LiveEditor className={styles.Editor} />
      <div className={clsx(styles.Header, styles.PreviewHeader)}>Result</div>
      <div className={styles.PreviewContainer}>
        <LivePreview />
        <LiveError />
      </div>
    </LiveProvider>
  );
};

export default LiveCoderReact;
