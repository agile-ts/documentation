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
  height: 5rem;
`;

const Text = styled.div`
  color: var(--ifm-navbar-link-color);
  font-size: 4rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Cursor = styled.div<{ isTyping: boolean }>`
  background-color: var(--ifm-navbar-link-active-color);
  margin-left: 10px;

  width: 0.6rem;
  height: 4rem;

  @media (max-width: 768px) {
    height: 2rem;
    width: 0.3rem;
  }

  @-webkit-keyframes blink {
    0% {
      background: transparent;
    }
    50% {
      background: var(--ifm-navbar-link-active-color);
    }
    100% {
      background: transparent;
    }
  }

  @keyframes blink {
    0% {
      background: transparent;
    }
    50% {
      background: var(--ifm-navbar-link-active-color);
    }
    100% {
      background: transparent;
    }
  }

  ${({ isTyping }) => !isTyping && `-webkit-animation: blink 0.8s infinite;`}
`;

export default HeaderTyper;
