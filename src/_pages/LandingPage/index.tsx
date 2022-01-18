import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import PageLayout from '../../components/layout/PageLayout';
import HeaderView from './components/HeaderView';
import StraightforwardView from './components/StraightforwardView';
import styles from './styles.module.css';



const LandingPage: React.FC = () => {
  return (
    <PageLayout>
      <main className={styles.Container}>
        <HeaderView />
        <StraightforwardView />
        {/* <OtherFeaturesView /> */}
        {/* <StartCodingView /> */}
        {/* <StatsView /> */}
        {/* <GiveItATryView /> */}
      </main>
    </PageLayout>
  );
};

export default LandingPage;
