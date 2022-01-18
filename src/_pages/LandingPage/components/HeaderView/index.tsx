import React, { useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HeaderTyper from './components/HeaderTyper';
import Spacer from '../../../../components/other/Spacer';
import PrimaryButton from '../../../../components/buttons/PrimaryButton';
import GithubButton from '../../../../components/buttons/GithubButton';
import styles from './styles.module.css';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import Rocket from './components/Rocket';
import { shuffle } from '../../../../utils';

const HeaderView: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const { windowHeight } = useWindowSize();
  const [toTypeWords] = useState(
    shuffle([
      'easy',
      'scalable',
      'efficient',
      'flexible',
    ])
  );

  return (
    <div
      className={styles.Container}
      style={{ height: windowHeight > 800 ? windowHeight : undefined }}>
      <div>
        <h1 className={styles.HeaderTitle}>
          Distributed model training <span className={styles.SeparatorText}>made</span>
        </h1>
        <Spacer height={20} />
        <HeaderTyper
          className={styles.HeaderTyper}
          words={toTypeWords}
          delay={5000}
          defaultText={toTypeWords[0] || 'simple'}
        />
        <Spacer height={50} />
        <p className={styles.HeaderTitle}>with Colossal-AI</p>
        <Spacer height={50} />
        <div className={styles.ButtonContainer}>
          <PrimaryButton
            className={styles.GetStartedButton}
            to={'/docs/introduction'}>
            GET STARTED
          </PrimaryButton>
          <GithubButton
            className={styles.GithubButton}
            to={siteConfig.customFields.githubUrl as any}
          />
        </div>
      </div>
      <Rocket className={styles.RocketImage} />
    </div>
  );
};

export default HeaderView;
