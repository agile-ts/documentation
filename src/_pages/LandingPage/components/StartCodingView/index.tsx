import React from 'react';
import styles from './styles.module.css';
import LiveCoder from './components/LiveCoder';
import Spacer from '../../../../components/other/Spacer';

const reactCode = `// 1️⃣ Create Instance of AgileTs
const App = new Agile();

// 2️⃣ Create State with help of before defined Agile Instance
const MY_FIRST_STATE = App.createState("Hello World");

let helloWorldCount = 0;
const RandomComponent = () => {
    // 3️⃣ Bind initialized State to 'RandomComponent' for reactivity
    const myFirstState = useAgile(MY_FIRST_STATE);

    return (
        <div>
            <p>{myFirstState}</p>
            <button
                onClick={() => {
                    // 4️⃣ Update State value on Button press
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
      <div className={styles.Content}>
        <div className={styles.InnerContent}>
          <div className={styles.HeaderContainer}>
            <div className={styles.Tagline}>Stop Talking</div>
            <Spacer height={10} />
            <div className={styles.Title}>Start Coding</div>
          </div>
          <Spacer height={30} />
          <LiveCoder reactCode={reactCode} />
        </div>
      </div>
    </div>
  );
};

export default StartCodingView;
