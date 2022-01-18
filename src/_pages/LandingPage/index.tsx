import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import PageLayout from '../../components/layout/PageLayout';
import HeaderView from './components/HeaderView';
import styles from './styles.module.css';


const LandingPage: React.FC = () => {
  return (
    <PageLayout>
      <main className={styles.Container}>
        <HeaderView />
      </main>
    </PageLayout>
  );
};

export default LandingPage;
