import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Typist from "react-typist";

export type Props = { words: string[] };

const EndlessTyper: React.FC<Props> = (props) => {
  const { words } = props;

  const [maxCount] = useState(words.length);
  const [count, setCount] = useState(0);

  return (
    <Typist
      avgTypingDelay={50}
      onTypingDone={() =>
        count < maxCount ? setCount(count + 1) : setCount(0)
      }
    >
      {words.forEach((word) => {
        return (
          <div>
            <span>{word}</span>
            <Typist.Backspace count={word.length} delay={800} />
          </div>
        );
      })}
    </Typist>
  );
};

export default EndlessTyper;
