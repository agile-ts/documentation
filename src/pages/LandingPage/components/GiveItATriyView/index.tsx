import React from "react";
import styled from "styled-components";

const GiveItATryView: React.FC = () => {
  return (
    <Container>
      <h1>Give it a try Section</h1>
    </Container>
  );
};

const Container = styled.div`
  height: 200px;
  width: 100%;
  background-color: var(--ifm-background-color);
`;

export default GiveItATryView;
