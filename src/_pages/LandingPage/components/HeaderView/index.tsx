import React, { useEffect, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HeaderTyper from './components/HeaderTyper';
import Spacer from '../../../../components/other/Spacer';
import PrimaryButton from '../../../../components/buttons/PrimaryButton';
import GithubButton from '../../../../components/buttons/GithubButton';
import styles from './styles.module.css';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import MouseScroller from './components/MouseScroller';
import { animated, useSpring } from 'react-spring';
import Astronaut from './components/Astronaut';

const HeaderView: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const { windowHeight } = useWindowSize();
  const [toTypeWords] = useState([
    'simple',
    'straightforward',
    'fast',
    'understandable',
    'boilerplate free',
    'spacy',
    'fun',
  ]);

  return (
    <div className={styles.Container}>
      <div>
        <div className={styles.HeaderTitle}>Creating States</div>
        <Spacer height={25} />
        <div className={styles.SeparatorContainer}>
          <div className={styles.SeparatorLeft} />
          <div className={styles.SeparatorText}>should be</div>
          <div className={styles.SeparatorRight} />
        </div>
        <Spacer height={25} />
        <HeaderTyper
          words={toTypeWords}
          delay={5000}
          defaultText={toTypeWords[0] || 'simple'}
        />
        <Spacer height={50} />
        <div className={styles.DescriptionText}>{siteConfig.tagline}</div>
        <Spacer height={50} />
        <div className={styles.ButtonContainer}>
          <PrimaryButton
            className={styles.GetStartedButton}
            to={'/docs/introduction'}>
            GET STARTED
          </PrimaryButton>
          <GithubButton
            className={styles.GithubButton}
            to={siteConfig.customFields.githubUrl}
          />
        </div>
      </div>
      <Astronaut className={styles.AstronautImage} />
      {windowHeight > 850 && windowHeight < 1200 && <MouseScroller />}
    </div>
  );
};

export default HeaderView;
