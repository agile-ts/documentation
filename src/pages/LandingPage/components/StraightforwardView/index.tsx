import React from 'react';
import styles from './styles.module.css';
import Spacer from '../../../../components/other/Spacer';
import SectionScroller from '../../../../components/other/SectionScroller';
import { sections } from './sections';

const StraightforwardView: React.FC = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.Content}>
        <div className={styles.HeaderContainer}>
          <div className={styles.Tagline}>Why choose us?</div>
          <Spacer height={10} />
          <div className={styles.Title}>Straightforward</div>
          <Spacer height={20} />
          <div className={styles.Description}>
            AgileTs saves you the hassle of creating boilerplate code and offers
            powerful tools that make your life easier.
          </div>
        </div>
        <Spacer height={50} />
        <Spacer height={10} />
        <SectionScroller sections={sections} startIndex={1} />
      </div>
    </div>
  );
};

export default StraightforwardView;
