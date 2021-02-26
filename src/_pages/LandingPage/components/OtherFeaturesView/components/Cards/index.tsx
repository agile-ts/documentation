import React from 'react';
import Card from './components/Card';

export interface CardInterface {
  title: string;
  description: string;
  imagePath: string;
  to: string;
}

export type Props = { cards: CardInterface[]; startIndex?: number };

const Cards: React.FC<Props> = (props) => {
  const { cards } = props;

  return (
    <div>
      {cards.map((card) => (
        <Card data={card} />
      ))}
    </div>
  );
};

export default Cards;
