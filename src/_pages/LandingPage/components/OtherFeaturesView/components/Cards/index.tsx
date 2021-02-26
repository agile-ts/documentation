import React, { useState } from 'react';
import Card from './components/Card';
import styles from './styles.module.css';
import RadioButton from './components/RadioButton';

export interface CardInterface {
  title: string;
  description: string;
  imagePath: string;
  to: string;
}

export type Props = { cards: CardInterface[]; startIndex?: number };

const Cards: React.FC<Props> = (props) => {
  const { cards } = props;
  const startIndex =
    props.startIndex && props.startIndex < cards.length
      ? props.startIndex
      : Math.round(cards.length / 2);

  const [index, setIndex] = useState(startIndex);

  return (
    <div className={styles.Container}>
      {cards.map((card, i) => (
        <RadioButton active={i === index} />
      ))}
      <div className={styles.Slider}>
        {cards.map((card, i) => (
          <Card data={card} active={i === index} />
        ))}
      </div>
    </div>
  );
};

export default Cards;
