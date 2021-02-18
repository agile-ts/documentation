import React from "react";
import styled from "styled-components";
import styles from "./giveItATry.module.css";
import Spacer from "../../../../components/other/Spacer";

const GiveItATryView: React.FC = () => {
  return (
    <Container>
      <RedText>Give it a try Section 1</RedText>
      <Spacer height={10} />
      <h1 className={styles.red_text}>Give it a try Section 2</h1>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: green;
`;

const RedText = styled.h1`
  color: red;
  background-color: blue;
  letter-spacing: 10px;
  margin: 0;
`;

export default GiveItATryView;
