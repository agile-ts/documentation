import React from "react";
import styled from "styled-components";
import PrimaryButton from "../../../../components/buttons/PrimaryButton";
import GithubButton from "../../../../components/buttons/GithubButton";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import HeaderTyper from "../../../../components/HeaderTyper";
import Spacer from "../../../../components/Spacer";

const HeaderView: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Container>
      <ContentContainer>
        <HeaderTitle>Creating States</HeaderTitle>
        <Spacer height={25} />
        <SeparatorContainer>
          <SeparatorLeft />
          <SeparatorText>should be</SeparatorText>
          <SeparatorRight />
        </SeparatorContainer>
        <Spacer height={25} />
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
        <Spacer height={50} />
        <DescriptionText>{siteConfig.customFields.description}</DescriptionText>
        <Spacer height={50} />
        <ButtonContainer>
          <GetStartedButton to={"/docs"}>GET STARTED</GetStartedButton>
          <GithubButtonContainer to={siteConfig.customFields.githubUrl} />
        </ButtonContainer>
      </ContentContainer>
      <AstronautImage src={"img/astronaut-light.svg"} alt={"Astronaut"} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 500px;
  width: 100%;

  margin: 0 auto;
  max-width: var(--ifm-container-width);
  padding: 4.5rem 1rem;
  margin-bottom: 200px;

  @media (max-width: 768px) {
    margin-top: 50px;
  }
`;

const ContentContainer = styled.div``;

const AstronautImage = styled.img`
  position: absolute;
  right: 0;
  width: 45%;
  max-width: 800px;
  opacity: 1;

  @media (max-width: 996px) {
    opacity: 0;
  }
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
  margin-bottom: 7px;
`;

const SeparatorRight = styled.div`
  background-color: var(--ifm-navbar-link-active-color);
  width: 220px;
  height: 2px;

  @media (max-width: 768px) {
    width: 150px;
  }
`;

const DescriptionText = styled.div`
  color: var(--ifm-color-primary-lightest);
  font-size: 1.5rem;
  max-width: 400px;

  @media (max-width: 768px) {
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

const GetStartedButton = styled(PrimaryButton)`
  width: 200px;
  margin-right: 20px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

export default HeaderView;
