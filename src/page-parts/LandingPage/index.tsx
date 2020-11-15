import React from "react";
import HeaderView from "./parts/HeaderView";
import IncludesView from "./parts/IncludesView";
import FeatureView from "./parts/FeatureView";
import CodeExample1View from "./parts/CodeExample1View";
import styled from "styled-components";

const LandingPage: React.FC = () => {

    return (
        <div>
            <HeaderView/>
            <main>
                <FeatureView/>
                <IncludesView/>

                <BorderContainer>
                    <Border/>
                </BorderContainer>

                <CodeExampleContainer>
                    <CodeExample1View/>
                </CodeExampleContainer>
            </main>
        </div>
    )
}

export default LandingPage;

const BorderContainer = styled.div`
 display: flex;
 width: 100%; 
 justify-content: center;

`;

const Border = styled.div`
  height: 2px;
  width: 90%;
  align-self: center;
  background-color: #8481af;
`;

const CodeExampleContainer = styled.div`
   margin: 100px 0 100px 0;
   
   @media (max-width: 900px) {
     margin: 0 0 50px 0;
   }
`;

