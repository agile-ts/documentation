import { animated, useSpring } from 'react-spring';
import React, { useState } from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';
import RocketSVG from '../../../../../../../static/img/pages/landing/rocket.svg';

type Props = { className?: string };

const Rocket: React.FC<Props> = (props) => {
  const { className } = props;
  const [isRaised, setIsRaised] = useState(false);
  const [inAnimation, setInAnimation] = useState(false);

  // Animation
  const animatedAstronautProps = useSpring({
    to: { x: isRaised ? 0 : 1 },
    config: {
      mass: 1,
      tension: 400,
      friction: 15,
      duration: 500,
    },
    onRest: () => {
      if (inAnimation) {
        setInAnimation(false);
      }
    }
  });

  const onMouseEnter = () => {
    if (!inAnimation) {
      setInAnimation(true);
      setIsRaised(!isRaised);
    }
  };

  return (
    <div className={clsx(styles.Container, className)}>
      <animated.div
        style={{
          transform: (animatedAstronautProps as any).x.to({
            range: [0, 0.5, 1],
            output: [
              `translateY(${0}px)`,
              `translateY(-${30}px)`,
              `translateY(${0}px)`,
            ],
          }),
        }}
        className={styles.ImageContainer}>
        <RocketSVG className={className} onMouseEnter={onMouseEnter}/>
      </animated.div>
    </div>
  );
};

export default Rocket;
