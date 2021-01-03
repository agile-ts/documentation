import React from "react";
import Card from "../../../components/Card";
import styled from "styled-components";
import RandomComponent from "../../../components/RandomComponent";
import {useWindowSize} from "../../../hooks/useWindowSize";


const CodeExample1View: React.FC = () => {
    const windowSize = useWindowSize();

    return (
        <CodeExampleContainer>
            <Container>
                <Card src={"img/first_state.svg"} width={windowSize.windowWidth / 2}
                      height={windowSize.windowWidth / 3} onClick={() => {
                    window.open("https://codesandbox.io/s/agilets-first-state-f12cz?file=/src/RandomComponent.js");
                }}/>
            </Container>
            <Container>
                <RandomComponent/>
            </Container>
        </CodeExampleContainer>
    )
}

export default CodeExample1View;

const CodeExampleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  margin: 0 100px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    margin: 0 10px;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 900px) {
    margin-top: 30px;
  }
`;