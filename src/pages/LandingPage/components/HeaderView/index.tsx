import React from 'react';
import styled from "styled-components";
import PrimaryButton from "../../../../components/buttons/PrimaryButton";
import GithubButton from "../../../../components/buttons/GithubButton";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const HeaderView: React.FC = () => {
    const {siteConfig} = useDocusaurusContext();

    return (
        <Container>
            <PrimaryButton to={"/docs"}>
                GET STARTED
            </PrimaryButton>
            <GithubButton to={siteConfig.customFields.githubUrl}/>
        </Container>
    );
}

const Container = styled.div`
  height: 500px;
  width: 100%;
`;

export default HeaderView;
