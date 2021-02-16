import React from "react";
import styled from "styled-components";

export type Props = { height: number };

const Spacer: React.FC<Props> = (props) => {
  const height = props.height || 100;

  return <Container height={height} />;
};

const Container = styled.div<{ height: number }>`
  ${(p) => `height: ${p.height}px;`};
`;

export default Spacer;
