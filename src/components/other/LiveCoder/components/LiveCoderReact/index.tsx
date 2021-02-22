import * as React from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import clsx from 'clsx';
import styles from './styles.module.css';
import { CodeSectionPropsInterface } from '../../index';
import ReactLiveScope from '@theme/ReactLiveScope';

interface Props extends CodeSectionPropsInterface {}

const LiveCoderReact: React.FC<Props> = (props) => {
  const { code, theme, transformCode } = props;

  return (
    <LiveProvider
      code={code.replace(/\n$/, '')}
      transformCode={transformCode || ((code) => `${code};`)}
      theme={theme}
      noInline={true}
      scope={ReactLiveScope}>
      <div className={styles.EditorContainer}>
        <LiveEditor className={styles.Editor} />
      </div>
      <div className={styles.PreviewOuterContainer}>
        <div className={styles.PreviewContainer}>
          <LivePreview />
          <LiveError />
        </div>
      </div>
    </LiveProvider>
  );
};

export default LiveCoderReact;
