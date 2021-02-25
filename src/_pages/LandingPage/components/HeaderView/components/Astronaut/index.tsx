import { animated, useSpring } from 'react-spring';
import React, { useEffect, useRef, useState } from 'react';
import { useAgile } from '@agile-ts/react';
import core from '../../../../../../core';
import styles from './styles.module.css';
import clsx from 'clsx';

type Props = { className?: string };

const Astronaut: React.FC<Props> = (props) => {
  const { className } = props;
  const [timing] = useState(200);
  const [isRaised, setIsRaised] = React.useState(false);
  const animated_Astronaut = useSpring({
    transform: isRaised ? `translateY(-${30}px)` : `translateY(0px)`,
    config: {
      mass: 1,
      tension: 400,
      friction: 15,
    },
  });
  const dark = useAgile(core.ui.ASTRONAUT_DARK);

  useEffect(() => {
    if (!isRaised) {
      return;
    }

    const timeoutId = setTimeout(() => {
      core.ui.toggleAstronautColor(!dark);
      setIsRaised(false);
    }, timing);

    return () => clearTimeout(timeoutId);
  }, [isRaised, timing]);

  const imageRef = useRef<HTMLImageElement>(null);
  const ctx = document.createElement('canvas').getContext('2d');

  // https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
  // https://stackoverflow.com/questions/38487569/click-through-png-image-only-if-clicked-coordinate-is-transparent
  function trigger(event: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    console.log('on click');

    console.log(event);
    console.log(ctx);

    // Get click coordinates
    const x = event.pageX - imageRef.current.offsetLeft;
    const y = event.pageY - imageRef.current.offsetTop;
    const w = (ctx.canvas.width = imageRef.current.width);
    const h = (ctx.canvas.height = imageRef.current.height);

    // Draw image to canvas
    // and read Alpha channel value
    ctx.drawImage(imageRef.current, 0, 0, w, h);
    const alpha = ctx.getImageData(x, y, 1, 1).data[3]; // [0]R [1]G [2]B [3]A

    console.log(ctx.getImageData(x, y, 1, 1));

    // If pixel is transparent,
    // retrieve the element underneath and trigger it's click event
    if (alpha === 0) {
      console.log('alpha0');
      imageRef.current.style.pointerEvents = 'none';
      const element = document.elementFromPoint(event.clientX, event.clientY);
      // element.trigger('click');
      imageRef.current.style.pointerEvents = 'auto';
    } else {
      setIsRaised(true);
      console.log('LOGO clicked!');
    }
  }

  return (
    <div className={clsx(styles.Container, className)}>
      <animated.img
        ref={imageRef}
        onMouseEnter={trigger}
        style={animated_Astronaut}
        className={styles.Image}
        src={`img/astronaut-${dark ? 'dark' : 'light'}.svg`}
        alt={'Astronaut'}
      />
      <div className={styles.Text}>Poke me 👆 to mutate my color State.</div>
    </div>
  );
};

export default Astronaut;
