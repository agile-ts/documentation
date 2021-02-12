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
        delay={2000}
      />
      <PrimaryButton to={"/docs"}>GET STARTED</PrimaryButton>
      <GithubButton to={siteConfig.customFields.githubUrl} />
    </Container>
  );
};

const Container = styled.div`
  height: 500px;
  width: 100%;
`;

export default HeaderView;
