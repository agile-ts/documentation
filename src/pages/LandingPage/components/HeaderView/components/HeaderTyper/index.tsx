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
        setText(currentText);
      },
      isTypingListener: (isTyping) => {
        console.log("IsTyping?", isTyping);
      },
    });

    autoTyper
      .type({ toType: "hello", timeBetweenLetter: 100 })
      .remove()
      .sleep({ ms: 5000 })
      .type({ toType: "hello there" })
      .remove({ charCount: 5 })
      .sleep({ ms: 2000 })
      .type({ toType: " stranger" })
      .start();
  }, []);

  return <p>{text}</p>;

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
