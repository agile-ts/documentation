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
      <DescriptionText>{siteConfig.customFields.description}</DescriptionText>
      <ButtonContainer>
        <GetStartedButtonContainer to={"/docs"}>
          GET STARTED
        </GetStartedButtonContainer>
        <GithubButtonContainer to={siteConfig.customFields.githubUrl} />
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 500px;
  width: 100%;
  max-width: var(--ifm-container-width);
  margin: 0 auto;
  padding: 4.5rem 1rem;
`;

const HeaderTitle = styled.div`
  color: var(--ifm-navbar-link-color);
  font-size: 4rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SeparatorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-bottom: 25px;
  margin-top: 25px;

  @media (max-width: 768px) {
    margin-bottom: 0px;
    margin-top: 10px;
  }
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
`;

const SeparatorRight = styled.div`
  background-color: var(--ifm-navbar-link-active-color);
  width: 220px;
  height: 2px;
`;

const DescriptionText = styled.div`
  color: var(--ifm-color-primary-lightest);
  font-size: 1.5rem;
  max-width: 400px;

  margin-top: 50px;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    margin-top: 25px;
    font-size: 1.3rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const GithubButtonContainer = styled(GithubButton)`
  width: 200px;
`;

const GetStartedButtonContainer = styled(PrimaryButton)`
  width: 200px;
  margin-right: 20px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

export default HeaderView;
