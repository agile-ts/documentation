import React from 'react';
import { useWindowSize } from '../../hooks/useWindowSize';
import Layout from '@theme/Layout';
import styles from './styles.module.css';

import 'react-toastify/dist/ReactToastify.css';
import HeaderView from './components/HeaderView';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import StraightforwardView from './components/StraightforwardView';
import GiveItATryView from './components/GiveItATriyView';

const LandingPage: React.FC = () => {
  const windowSize = useWindowSize();
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={`Home`} description={siteConfig.customFields.description}>
      <div className={styles.Container}>
        <HeaderView />
        <StraightforwardView />
        <GiveItATryView />
      </div>
    </Layout>
  );
};

export default LandingPage;
