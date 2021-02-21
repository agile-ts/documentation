import React from 'react';
import styles from './styles.module.css';
import { IconContext } from 'react-icons';
import clsx from 'clsx';

export type FrameworkButtonProps = {
  logo: React.ComponentElement<any, any>;
  color: string;
  active: boolean;
  selectable: boolean;
  notSelectableToolTip?: string;
  onClick?: () => void;
};

const FrameworkButton: React.FC<FrameworkButtonProps> = (props) => {
  const {
    logo,
    color,
    active,
    selectable,
    onClick,
    notSelectableToolTip,
  } = props;

  return (
    <div
      className={styles.Container}
      style={{ cursor: selectable ? 'pointer' : 'default' }}
      onClick={selectable && onClick}>
      {!active && <div className={styles.LogoContainerOverlay} />}
      <div
        className={styles.LogoContainer}
        style={{ border: `2px solid ${color}` }}>
        <IconContext.Provider value={{ color: color, size: '1.5rem' }}>
          {logo}
        </IconContext.Provider>
      </div>
      {!selectable && notSelectableToolTip && (
        <span className={styles.TooltipText}>{notSelectableToolTip}</span>
      )}
    </div>
  );
};

export default FrameworkButton;
