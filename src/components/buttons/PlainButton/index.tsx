import React from 'react';
import { FiChevronRight } from 'react-icons/all';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.css';
import clsx from 'clsx';

export type Props = { to: string; className?: string; name: string };

const PlainButton: React.FC<Props> = (props) => {
  const { to, className, name } = props;
  const history = useHistory();

  return (
    <button
      className={clsx(styles.ButtonContainer, className)}
      onClick={() => {
        if (to.startsWith('http')) {
          window.open(to, '_blank');
          return;
        }
        history.push(to);
      }}>
      <div>{name}</div>
      <FiChevronRight size={16} className={styles.Chevron} />
    </button>
  );
};

export default PlainButton;
