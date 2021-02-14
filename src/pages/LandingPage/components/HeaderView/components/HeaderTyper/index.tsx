import React, { useEffect, useState } from "react";
import { AutoTyper } from "./AutoTyper";
import styled from "styled-components";

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
      delay: typeSpeed,
      textListener: (currentText) => {
        setText(currentText);
      },
      isTypingListener: (isTyping) => {
        setIsTyping(isTyping);
      },
    });

    autoTyper
      .type({ toType: "hello", timeBetweenLetter: 100 })
      .sleep({ ms: 3000 })
      .remove()
      .type({ toType: "hello there" })
      .remove({ charCount: 5 })
      .type({ toType: " stranger" })
      .remove()
      .sleep({ ms: 5000 })
      .loop({ count: 2 })
      .start();

    return () => {
      autoTyper.stop();
    };
  }, []);

  return (
    <Container>
      <Text>{text}</Text>
      <Cursor isTyping={isTyping}>|</Cursor>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Text = styled.p`
  color: var(--ifm-navbar-link-color);
  font-size: 65px;
  font-weight: bold;
`;

const Cursor = styled.p<{ isTyping: boolean }>`
  color: var(--ifm-navbar-link-active-color);
  font-size: 65px;
  font-weight: bold;
  margin-bottom: 35px;

  ${({ isTyping }) =>
    !isTyping &&
    `
    -webkit-animation: blink-animation 1s steps(5, start) infinite;

    @keyframes blink-animation {
      to {
        visibility: hidden;
      }
    }
    @-webkit-keyframes blink-animation {
     to {
        visibility: hidden;
      }
    }
    `}
`;

export default HeaderTyper;
