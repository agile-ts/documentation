import React from "react";
import {Agile} from "@agile-ts/core";
import {useAgile} from "@agile-ts/react";

const App = new Agile();
const MY_FIRST_STATE = App.createState("Hello World");
let helloWorldCount = 0;

const RandomComponent = () => {
    const myFirstState = useAgile(MY_FIRST_STATE);

    return (
        <div>
            <p>{myFirstState}</p>
            <button
                onClick={() => {
                    MY_FIRST_STATE.set(`Hello World ${++helloWorldCount}`)
                }}
            >
                Update State
            </button>
        </div>
    );
}

export default RandomComponent;