import React, { useCallback, useState } from 'react';
import Card from './components/Card';
import styles from './styles.module.css';
import BulletItem from './components/BulletItem';

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

  const getCardProps = useCallback(
    (
      i: number
    ): {
      translateX: number;
      zIndex: number;
      opacity: number;
      scale: number;
    } => {
      if (i - 3 >= index) {
        return {
          translateX: -210,
          zIndex: -1,
          opacity: 1,
          scale: 0.75,
        };
      }

      if (i - 2 === index) {
        return {
          translateX: -210,
          zIndex: 0,
          opacity: 1,
          scale: 0.75,
        };
      }

      if (i - 1 === index) {
        return {
          translateX: -100,
          zIndex: 1,
          opacity: 1,
          scale: 0.85,
        };
      }

      if (i === index) {
        return {
          translateX: 0,
          zIndex: 2,
          opacity: 1,
          scale: 1,
        };
      }

      if (i + 1 === index) {
        return {
          translateX: 100,
          zIndex: 1,
          opacity: 1,
          scale: 0.85,
        };
      }

      if (i + 2 === index) {
        return {
          translateX: 210,
          zIndex: 0,
          opacity: 1,
          scale: 0.75,
        };
      }

      if (i + 3 <= index) {
        return {
          translateX: 210,
          zIndex: -1,
          opacity: 1,
          scale: 0.75,
        };
      }
    },
    [index]
  );

  return (
    <div className={styles.Container}>
      <div className={styles.Slider}>
        {cards.map((card, i) => {
          const cardProps = getCardProps(i);
          return (
            <div
              className={styles.Item}
              style={{
                transform: `translateX(${cardProps.translateX}px) scale(${cardProps.scale})`,
                opacity: cardProps.opacity,
                zIndex: cardProps.zIndex,
              }}
              onClick={() => {
                setIndex(i);
              }}>
              <Card data={card} active={i === index} />
            </div>
          );
        })}
      </div>
      <div className={styles.BulletContainer}>
        {cards.map((card, i) => (
          <BulletItem
            active={i === index}
            onClick={() => {
              setIndex(i);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Cards;
