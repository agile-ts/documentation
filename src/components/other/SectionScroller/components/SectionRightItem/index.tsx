import React from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';
import Icons, { IconTypes } from '../../../Icons';

export type Props = {
  icon?: IconTypes;
  title: string;
  description: string;
  onClick: () => void;
  active: boolean;
};

const SectionRightItem: React.FC<Props> = (props) => {
  const { icon, title, description, onClick, active } = props;

  return (
    <div
      className={clsx(styles.Container, {
        [styles.Container_Active]: active,
      })}
      onClick={onClick}>
      <h3 className={styles.Header}>
        {icon && <Icons type={icon} className={styles.Icon} />}
        {title}
      </h3>
      <p className={styles.Description}>{description}</p>
    </div>
  );
};

export default SectionRightItem;
