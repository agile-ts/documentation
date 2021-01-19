import React, {useEffect} from "react";
import HeaderView from "./parts/HeaderView";
import IncludesView from "./parts/IncludesView";
import FeatureView from "./parts/FeatureView";
import CodeExample1View from "./parts/CodeExample1View";
import styled from "styled-components";
import {useWindowSize} from "../../hooks/useWindowSize";
import Layout from '@theme/Layout';

import 'react-toastify/dist/ReactToastify.css';

const LandingPage: React.FC = () => {
    const windowSize = useWindowSize();

    return (
        <Layout title={`Home`}
                description="AgileTs is a global State and Logic Framework for reactive Typescript & Javascript Applications. Supporting frameworks like React, React Native.."
        >
            <HeaderView/>
            <FeatureView/>
            {
                windowSize.windowWidth > 900 &&
                <div>
                    <BorderContainer>
                        <Border/>
                        <IncludesView/>
                        <Border/>
                    </BorderContainer>

                    <CodeExampleContainer>
                        <CodeExample1View/>
                    </CodeExampleContainer>
                </div>
            }
        </Layout>
    )
}

export default LandingPage;

const BorderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 50px 0 90px 0;
`;

const Border = styled.div`
  height: 2px;
  width: 45%;
  margin: 0 10px;

  align-self: center;
  background-color: var(--ifm-color-primary);
`;

const CodeExampleContainer = styled.div`
  margin-bottom: 200px;

  @media (max-width: 900px) {
    margin: 0 0 50px 0;
  }
`;

