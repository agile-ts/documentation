import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import styled from "styled-components";
import {useWindowSize} from "../../hooks/useWindowSize";
import Layout from '@theme/Layout';

import 'react-toastify/dist/ReactToastify.css';
import PrimaryButton from "../../components/buttons/PrimaryButton";
import GithubButton from "../../components/buttons/GithubButton";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import GiveItATry from "./components/GiveItATry";

const LandingPage: React.FC = () => {
    const windowSize = useWindowSize();
    const {siteConfig} = useDocusaurusContext();

    return (
        <Layout title={`Home`}
                description="AgileTs is a global State and Logic Framework for reactive Typescript & Javascript Applications. Supporting frameworks like React, React Native.."
        >
            <Container>
                <div>
                    <PrimaryButton to={"/docs"}>
                        GET STARTED
                    </PrimaryButton>
                    <GithubButton to={siteConfig.customFields.githubUrl}/>
                </div>
                <GiveItATry/>
            </Container>
        </Layout>
    );
}

export default LandingPage;

const Container = styled.div`
  display: flex;
  flex: 1;
  height: 1000px; // TODO REMOVE LATER
  flex-direction: column;
`;
