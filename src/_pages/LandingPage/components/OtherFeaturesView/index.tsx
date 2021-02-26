import React from 'react';
import styles from './styles.module.css';
import Spacer from '../../../../components/other/Spacer';
import Cards, { CardInterface } from './components/Cards';

const cards: CardInterface[] = [
  {
    title: 'Centralize',
    description:
      'AgileTs allows you to manage all your application logic and states outside of any UI framework in a central place.',
    to: 'docs/introduction',
    imagePath: 'img/pages/centralize.svg',
  },
  {
    title: 'Flexible',
    description:
      'AgileTs works with any UI-Layer and isn’t bound to any specific workflow. Use it the way it suits you best.',
    to: 'docs/introduction',
    imagePath: 'img/pages/flexible.svg',
  },
  {
    title: 'Easy to Use',
    description:
      'Learn the powerful tools of AgileTs in a short amount of time.',
    to: 'docs/introduction',
    imagePath: 'img/pages/easy_to_use.svg',
  },
  {
    title: 'Well Tested',
    description:
      'We spend much time to test AgileTs, to ensure it works to 99%.',
    to: 'docs/introduction',
    imagePath: 'img/docs/logger_example.png',
  },
];

const OtherFeaturesView: React.FC = () => {
  return (
    <div className={styles.Container}>
      <Spacer height={30} />
      <Cards cards={cards} />
    </div>
  );
};

export default OtherFeaturesView;
