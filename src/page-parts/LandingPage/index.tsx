import React from "react";
import HeaderView from "./parts/HeaderView";
import styled from "styled-components";
import IncludesView from "./parts/IncludesView";
import FeatureView from "./parts/FeatureView";
import {Agile} from "@agile-ts/core";
import {useAgile} from "@agile-ts/react";

const App = new Agile();
const MyFirstState = App.State('Hello World');

const LandingPage: React.FC = () => {
    const myFirstState = useAgile(MyFirstState);

    return(
        <div>
            <HeaderView/>
            <main>
                <FeatureView/>
                <IncludesView/>
                <CodeExampleContainer>

                </CodeExampleContainer>
                <img src={"img/first_state.svg"} alt={"Header Background"}/>
                <div>
                    <p>{myFirstState}</p>
                    <button
                        onClick={() =>
                            setTimeout(() => {
                                MyFirstState.set("Yeah it works");
                            }, 1000)
                        }
                    >
                        Change your first State
                    </button>
                </div>
            </main>
        </div>
    )
}

export default LandingPage;

const CodeExampleContainer = styled.div`
height: 500px;
`;