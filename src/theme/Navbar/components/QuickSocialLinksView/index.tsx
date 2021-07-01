import clsx from 'clsx';
import styles from './styles.module.css';
import { FaDiscord, FaGithub } from 'react-icons/fa';
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const QuickSocialLinksView = (props: { className?: string }): JSX.Element => {
  const { className } = props;
  const { siteConfig } = useDocusaurusContext();

  return (
    <div className={clsx(className, styles.IconContainer)}>
      <FaGithub
        className={styles.Icon}
        onClick={() => {
          if (typeof window !== 'undefined')
            window.open(siteConfig.customFields.githubUrl, '_blank');
        }}
      />
      <FaDiscord
        className={styles.Icon}
        onClick={() => {
          if (typeof window !== 'undefined')
            window.open(siteConfig.customFields.discordUrl, '_blank');
        }}
      />
    </div>
  );
};

export default QuickSocialLinksView;
