import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import styled from "styled-components";
import {useWindowSize} from "../../hooks/useWindowSize";
import Layout from '@theme/Layout';

import 'react-toastify/dist/ReactToastify.css';
import PrimaryButton from "../../components/buttons/PrimaryButton";
import GithubButton from "../../components/buttons/GithubButton";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"

const LandingPage: React.FC = () => {
    const windowSize = useWindowSize();
    const { siteConfig } = useDocusaurusContext();

    return (
        <Layout title={`Home`}
                description="AgileTs is a global State and Logic Framework for reactive Typescript & Javascript Applications. Supporting frameworks like React, React Native.."
        >
            <Container>
                <PrimaryButton to={"/docs"}>
                   GET STARTED
                </PrimaryButton>
                <GithubButton to={siteConfig.customFields.githubUrl}/>
            </Container>
        </Layout>
    )
}

export default LandingPage;

const Container = styled.div`
margin: 20px;
`;
