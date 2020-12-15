import React from "react";
import styled from "styled-components";

const LoadingPage: React.FC = () => {
    return (
        <Container>
            <Image src={"img/header_background.svg"} alt={"Header Background"}/>
        </Container>
    )
}

export default LoadingPage;

const Container = styled.div`
  display: flex;
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;