import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import styles from "./styles.module.css";

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

  const addChar = (char: string, t: string) => {
    setTimeout(() => {
      t = `${t}${char}`;
      setText(t);
      console.log("AddChar", t);
      addChar(makeid(1), t);
    }, 500);
  };

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  useEffect(() => {
    addChar("h", text);
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
