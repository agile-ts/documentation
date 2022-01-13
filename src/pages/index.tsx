import React, { useEffect } from 'react';

import LandingPage from '../_pages/LandingPage';
import core from '../core';

const Home = () => {
  // Initial fetch Stats
  useEffect(() => {
    core.stats.getNPMDownloads();
    core.stats.getGithubStats();
  }, []);

  return <LandingPage />;
};

export default Home;
