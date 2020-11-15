import React from "react";
import HeaderView from "./parts/HeaderView";
import IncludesView from "./parts/IncludesView";
import FeatureView from "./parts/FeatureView";
import CodeExample1View from "./parts/CodeExample1View";
import styled from "styled-components";
import {useWindowSize} from "../../hooks/useWindowSize";

const LandingPage: React.FC = () => {
    const windowSize = useWindowSize();
    return (
        <div>
            <HeaderView/>
            <main>
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

            </main>
        </div>
    )
}

export default LandingPage;

const BorderContainer = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: space-between;
 margin: 100px 0;
`;

const Border = styled.div`
  height: 2px;
  width: 45%;
  margin: 0 10px;
 
  align-self: center;
  background-color: #8481af;
`;

const CodeExampleContainer = styled.div`
   margin-bottom: 200px;
   
   @media (max-width: 900px) {
     margin: 0 0 50px 0;
   }
`;

