import React from 'react';
import styles from './styles.module.css';
import LiveCoder from '../../../../components/other/LiveCoder';

const reactCode = `
// Let's start by creating an Agile Instance
const App = new Agile();

// Now we are able to build our first State which has the intial value "Hello World"
const MY_FIRST_STATE = App.createState("Hello World");
let helloWorldCount = 0;

const RandomComponent = () => {
    // With the 'useAgile' Hook we bind our just created State to the 'RandomComponent'
    const myFirstState = useAgile(MY_FIRST_STATE);

    return (
        <div>
            <p>{myFirstState}</p>
            <button
                onClick={() => {
                    // Here we just update our State Value
                    MY_FIRST_STATE.set('Hello World ' + ++helloWorldCount);
                }}
            >
                Update State
            </button>
        </div>
    );
}

render(<RandomComponent/>);
`;

const StartCodingView: React.FC = () => {
  return (
    <div className={styles.Container}>
      <LiveCoder reactCode={reactCode} />
    </div>
  );
};

export default StartCodingView;
