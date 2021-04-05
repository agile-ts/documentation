import React from 'react';
import styles from './styles.module.css';
import Cards, { CardInterface } from './components/Cards';

const cards: CardInterface[] = [
  {
    title: 'Centralize',
    description:
      'AgileTs allows you to manage all your application logic and states outside of any UI framework in a central place.',
    to: 'docs/introduction',
    imagePath: 'img/pages/landing/software_engineer.svg',
  },
  {
    title: 'Flexible',
    description:
      'AgileTs works with nearly any UI-Layer and isn’t bound to any specific workflow. Use it the way it suits you best.',
    to: 'docs/introduction',
    imagePath: 'img/pages/landing/teaching.svg',
  },
  {
    title: 'Easy to Use',
    description:
      'Learn the powerful tools of AgileTs in a short amount of time.',
    to: 'docs/introduction',
    imagePath: 'img/pages/landing/science.svg',
  },
  {
    title: 'Well Tested',
    description:
      'AgileTs has over 2500 jest tests to ensure everything works as expected.',
    to: 'docs/introduction',
    imagePath: 'img/pages/landing/engineer.svg',
  },
  {
    title: 'Typescript',
    description:
      'AgileTs is almost 100% typesafe and provides type inference for any complex structure.',
    to: 'docs/introduction',
    imagePath: 'img/pages/landing/typescript.svg',
  },
];

const OtherFeaturesView: React.FC = () => {
  return (
    <div className={styles.Container}>
      <Cards cards={cards} />
    </div>
  );
};

export default OtherFeaturesView;
