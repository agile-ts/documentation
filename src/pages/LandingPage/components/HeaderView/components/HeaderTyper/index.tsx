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

    words.forEach((word) => {
      autoTyper.type({ toType: word }).sleep({ ms: delay }).remove();
    });

    autoTyper.loop().start();

    return () => {
      autoTyper.stop();
    };
  }, []);

  return (
    <Container>
      <Text>{text}</Text>
      <Cursor isTyping={isTyping} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const Text = styled.p`
  color: var(--ifm-navbar-link-color);
  font-size: 4rem;
  font-weight: bold;
`;

const Cursor = styled.div<{ isTyping: boolean }>`
  background-color: var(--ifm-navbar-link-active-color);
  margin-left: 10px;
  margin-bottom: 10px;

  width: 0.6rem;
  height: 4rem;
  line-height: 75px;

  ${({ isTyping }) => !isTyping && `-webkit-animation: blink 0.8s infinite;`}

  @-webkit-keyframes blink {
    0% {
      background: #222;
    }
    50% {
      background: var(--ifm-navbar-link-active-color);
    }
    100% {
      background: #222;
    }
  }

  @keyframes blink {
    0% {
      background: #222;
    }
    50% {
      background: var(--ifm-navbar-link-active-color);
    }
    100% {
      background: #222;
    }
  }
`;

export default HeaderTyper;
