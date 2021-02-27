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

  const [cardDimensions] = useState<{ width: number; height: number }>({
    width: 400,
    height: 600,
  });

  const getCardProps = useCallback(
    (
      i: number
    ): {
      translateX: number;
      zIndex: number;
      opacity: number;
      scale: number;
    } => {
      const { width } = cardDimensions;

      if (i - 3 >= index) {
        return {
          translateX: -width / 2 - width / 40,
          zIndex: -1,
          opacity: 1,
          scale: 0.75,
        };
      }

      if (i - 2 === index) {
        return {
          translateX: -width / 2 - width / 40,
          zIndex: 0,
          opacity: 1,
          scale: 0.75,
        };
      }

      if (i - 1 === index) {
        return {
          translateX: -width / 4,
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
          translateX: width / 4,
          zIndex: 1,
          opacity: 1,
          scale: 0.85,
        };
      }

      if (i + 2 === index) {
        return {
          translateX: width / 2 + width / 40,
          zIndex: 0,
          opacity: 1,
          scale: 0.75,
        };
      }

      if (i + 3 <= index) {
        return {
          translateX: width / 2 + width / 40,
          zIndex: -1,
          opacity: 1,
          scale: 0.75,
        };
      }
    },
    [index, cardDimensions]
  );

  return (
    <div className={styles.Container}>
      <div
        className={styles.Slider}
        style={{
          height: cardDimensions.height,
          width: cardDimensions.width || '100%',
        }}>
        {cards.map((card, i) => {
          const cardProps = getCardProps(i);
          return (
            <div
              className={styles.Item}
              style={{
                transform: `translateX(${cardProps.translateX}px) scale(${cardProps.scale})`,
                opacity: cardProps.opacity,
                zIndex: cardProps.zIndex,
                width: cardDimensions.width || '100%',
                cursor: i === index ? 'auto' : 'pointer',
              }}
              onClick={() => {
                setIndex(i);
              }}>
              <Card
                data={card}
                active={i === index}
                width={cardDimensions.width}
                height={cardDimensions.height}
              />
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
