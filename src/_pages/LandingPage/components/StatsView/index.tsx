import React from 'react';
import styles from './styles.module.css';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Spacer from '../../../../components/other/Spacer';
import { useAgile } from '@agile-ts/react';
import core from '../../../../core';
import StatBadge from './components/StatBadge';

const StatsView: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();

  const npmDownloads = useAgile(core.stats.NPM_DOWNLOADS);
  const githubStars = useAgile(core.stats.GITHUB_STARS);
  const githubForks = useAgile(core.stats.GITHUB_FORKS);

  return (
    <div className={styles.Container}>
      <div className={styles.Content}>
        <div className={styles.HeaderContainer}>
          <div className={styles.Tagline}>Always Open Source.</div>
          <Spacer height={10} />
          <div className={styles.Title}>Trusted by GitHub community</div>
          <Spacer height={20} />
        </div>
        <Spacer height={60} />
        <div className={styles.BadgesContainer}>
          <StatBadge
            icon={'star'}
            number={githubStars}
            text={'Stars'}
            to={`${siteConfig.customFields.githubUrl}/stargazers`}
            className={styles.Badge}
          />
          <StatBadge
            icon={'gitMerge'}
            number={githubForks}
            text={'Forks'}
            to={`${siteConfig.customFields.githubUrl}/network/members`}
            className={styles.Badge}
          />
          <StatBadge
            icon={'download'}
            number={npmDownloads}
            text={'Downloads'}
            to={siteConfig.customFields.npmCoreUrl}
            className={styles.Badge}
          />
        </div>
      </div>
    </div>
  );
};

export default StatsView;
