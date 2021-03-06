import * as React from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import styles from './styles.module.css';
import { CodeSectionPropsInterface } from '../../index';
import ReactLiveScope from '@theme/ReactLiveScope';
import { useEffect, useState } from 'react';

type Props = CodeSectionPropsInterface;

const LiveCoderReact: React.FC<Props> = (props) => {
  const { code, theme, transformCode } = props;

  const [mounted, setMounted] = useState(false);
  // The Prism theme on SSR is always the default theme but the site theme
  // can be in a different mode. React hydration doesn't update DOM styles
  // that come from SSR. Hence force a re-render after mounting to apply the
  // current relevant styles. There will be a flash seen of the original
  // styles seen using this current approach but that's probably ok. Fixing
  // the flash will require changing the theming approach and is not worth it
  // at this point.
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <LiveProvider
      key={String(mounted)}
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
