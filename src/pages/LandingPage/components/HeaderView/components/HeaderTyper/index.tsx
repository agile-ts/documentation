import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import styles from "./styles.module.css";
import { AutoTyper } from "./AutoTyper";

export type Props = {
  words?: string[];
  delay?: number;
  typeSpeed?: number;
};

const HeaderTyper: React.FC<Props> = (props) => {
  const delay = props.delay || 500;
  const words = props.words || ["nothing to type", "are you sure", "really?"];
  const typeSpeed = props.typeSpeed || 100;

  const [text, setText] = useState("hello");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const autoTyper = new AutoTyper({
      textListener: (currentText) => {
        console.log(currentText);
      },
    });

    autoTyper
      .type({ toType: "hello", timeBetweenLetter: 1000 })
      .remove()
      .start();
  }, []);

  return (
    <Typewriter
      options={{
        delay: typeSpeed,
        loop: true,
        autoStart: true,
        cursorClassName: styles.Typewriter__cursor,
        wrapperClassName: styles.Typewriter__wrapper,
      }}
      onInit={(typewriter) => {
        words.forEach((word) => {
          typewriter.typeString(word).pauseFor(delay).deleteAll();
        });
        typewriter.start();
      }}
    />
  );
};

export default HeaderTyper;
