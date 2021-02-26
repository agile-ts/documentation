import React from 'react';
import { CardInterface } from '../../index';
import styles from './styles.module.css';
import PlainButton from '../../../../../../../../components/buttons/PlainButton';

type Props = {
  data: CardInterface;
};

const Card: React.FC<Props> = (props) => {
  const { data } = props;

  return (
    <div className={styles.Container}>
      <div className={styles.ContentContainer}>
        <img
          alt={data.imagePath}
          src={data.imagePath}
          className={styles.Image}
        />
        <div className={styles.TextContainer}>
          <div className={styles.Title}>{data.title}</div>
          <div className={styles.Description}>{data.description}</div>
        </div>
      </div>
      <PlainButton
        className={styles.MoreButton}
        to={data.to}
        name={'Learn more'}
      />
    </div>
  );
};

export default Card;
