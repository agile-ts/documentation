import React from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';
import Layout from '@theme/Layout';
import styles from './styles.module.css';

import 'react-toastify/dist/ReactToastify.css';
import HeaderView from './components/HeaderView';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import StraightforwardView from './components/StraightforwardView';
import GiveItATryView from './components/GiveItATriyView';
import StartCodingView from './components/StartCodingView';
import StatsView from './components/StatsView';
import PageLayout from '../../components/layout/PageLayout';
import OtherFeaturesView from './components/OtherFeaturesView';

const LandingPage: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <PageLayout title={siteConfig.customFields.title}>
      <div className={styles.Container}>
        <HeaderView />
        <StraightforwardView />
        <OtherFeaturesView />
        <StartCodingView />
        <StatsView />
        <GiveItATryView />
      </div>
    </PageLayout>
  );
};

export default LandingPage;
