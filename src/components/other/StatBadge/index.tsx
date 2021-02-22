import React from 'react';
import styles from './styles.module.css';
import { IconContext } from 'react-icons';
import Icons, { IconTypes } from '../Icons';

export type Props = {
  icon?: IconTypes;
  number: number;
  text: string;
  to: string;
};

const StatBadge: React.FC<Props> = (props) => {
  const { icon, number, text, to } = props;

  return (
    <div className={styles.Container}>
      {icon && (
        <div className={styles.IconContainer}>
          <Icons type={icon} className={styles.Icon} />
        </div>
      )}
      <div className={styles.ContentContainer}>
        <div className={styles.Number}>{number}</div>
        <div className={styles.Text}>{text}</div>
      </div>
    </div>
  );
};

export default StatBadge;
