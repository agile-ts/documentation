import React from "react";
import styled from "styled-components";
import PrimaryButton from "../../../../components/buttons/PrimaryButton";
import GithubButton from "../../../../components/buttons/GithubButton";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import HeaderTyper from "./components/HeaderTyper";

const HeaderView: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Container>
      <HeaderTitle>Creating States</HeaderTitle>
      <SeparatorContainer>
        <SeparatorLeft />
        <SeparatorText>should be</SeparatorText>
        <SeparatorRight />
      </SeparatorContainer>
      <HeaderTyper
        words={[
          "simple",
          "straightforward",
          "fast",
          "understandable",
          "boilerplate free",
          "spacy",
          "fun",
        ]}
        delay={5000}
      />
      <ButtonContainer>
        <PrimaryButton to={"/docs"}>GET STARTED</PrimaryButton>
        <GithubButton to={siteConfig.customFields.githubUrl} />
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 500px;
  width: 100%;
  max-width: var(--ifm-container-width);
  margin: 0 auto;
  margin-top: 100px;
`;

const HeaderTitle = styled.p`
  color: var(--ifm-navbar-link-color);
  font-size: 4rem;
  font-weight: bold;
`;

const SeparatorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SeparatorLeft = styled.div`
  background-color: var(--ifm-navbar-link-active-color);
  width: 20px;
  height: 2px;
`;

const SeparatorText = styled.div`
  color: var(--ifm-navbar-link-active-color);
  font-size: 1.25rem;
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 5px;
`;

const SeparatorRight = styled.div`
  background-color: var(--ifm-navbar-link-active-color);
  width: 220px;
  height: 2px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export default HeaderView;
