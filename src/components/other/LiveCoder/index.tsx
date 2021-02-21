import * as React from 'react';
import styles from './styles.module.css';
import LiveCoderReact from './components/LiveCoderReact';
import { PrismTheme } from 'prism-react-renderer';
import { useState } from 'react';
import LiveCodeNotFound from './components/LiveCodeNotFound';

type Props = {
  reactCode: string;
  theme?: PrismTheme;
  transformCode?: (code: string) => string;
};

type CodeSectionProps = {
  code: string;
  theme?: PrismTheme;
  transformCode?: (code: string) => string;
};

interface CodeSectionInterface {
  codeComponent: (props: CodeSectionProps) => React.ComponentElement<any, any>;
}

const codeSections: { [key: string]: CodeSectionInterface } = {
  react: {
    codeComponent: (props) => (
      <LiveCoderReact
        code={props.code}
        transformCode={props.transformCode}
        theme={props.theme}
      />
    ),
  },
};

const LiveCoder: React.FC<Props> = (props) => {
  const { reactCode, theme, transformCode } = props;

  const [codeSectionKey, setCodeSectionKey] = useState('react');
  const CurrentCodeComponent = codeSections[codeSectionKey]?.codeComponent;

  return (
    <div className={styles.Container}>
      {CurrentCodeComponent ? (
        <CurrentCodeComponent
          code={reactCode}
          theme={theme}
          transformCode={transformCode}
        />
      ) : (
        <LiveCodeNotFound name={codeSectionKey} />
      )}
    </div>
  );
};

export default LiveCoder;
