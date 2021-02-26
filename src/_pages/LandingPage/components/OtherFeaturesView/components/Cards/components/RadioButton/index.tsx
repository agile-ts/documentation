import React from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';

type Props = {
  className?: string;
  active: boolean;
};

const RadioButton: React.FC<Props> = (props) => {
  const { className, active } = props;
  return <div className={clsx(styles.Container, className)} />;
};

export default RadioButton;
