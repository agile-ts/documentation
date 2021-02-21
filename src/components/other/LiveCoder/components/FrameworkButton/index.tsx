import React from 'react';
import styles from './styles.module.css';
import { IconContext } from 'react-icons';

export type FrameworkButtonProps = {
  logo: React.ComponentElement<any, any>;
  color: string;
  active: boolean;
};

const FrameworkButton: React.FC<FrameworkButtonProps> = (props) => {
  const { logo, color, active } = props;

  return (
    <div className={styles.Container}>
      {!active && <div className={styles.LogoContainerOverlay} />}
      <div
        className={styles.LogoContainer}
        style={{ border: `2px solid ${color}` }}>
        <IconContext.Provider value={{ color: color, size: '1.5rem' }}>
          {logo}
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default FrameworkButton;
