import React from 'react';

export interface CardInterface {
  title: string;
  description: string;
  imagePath: string;
}

export type Props = { cards: CardInterface[]; startIndex?: number };

const Cards: React.FC<CardInterface> = (props) => {
  return (
    <div>
      <div>much todo</div>
    </div>
  );
};

export default Cards;
