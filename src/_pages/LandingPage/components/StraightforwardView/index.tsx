import React from 'react';
import styles from './styles.module.css';
import Spacer from '../../../../components/other/Spacer';
import SectionScroller, {
  SectionInterface,
} from './components/SectionScroller';
import PlainButton from '../../../../components/buttons/PlainButton';

const sections: SectionInterface[] = [
  {
    code: `
const MY_STATE = createState("Jeff"); // <-
MY_STATE.set("Frank"); // Update State value
    `,
    codeWithComment: `
// Instantiate a global States with a single line of code
const MY_STATE = createState("Jeff"); // <-
MY_STATE.set("Frank"); // Update State value
    `,
    title: 'Create State',
    description: 'Instantiate a global State with a single line of code.',
    icon: 'zap',
  },
  {
    code: `
// MyComponent.whatever
const myState = useAgile(MY_STATE);
    `,
    codeWithComment: `
// Dynamically bind State to UI-Components for reactivity
const myState = useAgile(MY_STATE);
    `,
    title: 'Subscribe UI-Component',
    description: 'Dynamically bind State to UI-Components for reactivity.',
    icon: 'repeat',
  },
  {
    code: `
MY_STATE.persist();
    `,
    codeWithComment: `
// Permanently store State in the appropriate local Storage
MY_STATE.persist();
    `,
    title: 'Persist State',
    description: 'Permanently store State in the appropriate local Storage.',
    icon: 'server',
  },
  {
    code: `
const USERS = createCollection(); // <-
USERS.collect({id: 1, name: "Jeff"}, ['teamA']);
    `,
    codeWithComment: `
// Create a dynamic and reactive set of States
const App = new Agile();
const USERS = App.createCollection(); // <-
USERS.collect({id: 1, name: "Jeff"}, ['teamA']);
    `,
    title: 'Collection',
    description: 'Easily create a dynamic and reactive set of States.',
    icon: 'users',
  },
  {
    code: `
const IS_AUTH = createComputed(() => {
   return AUTH_TOKEN.exists && EXPIRATION_TIME.value > 0;
});
    `,
    codeWithComment: `
// Compute State depending on other States  
const App = new Agile();
const IS_AUTH = App.createComputed(() => {
   return AUTH_TOKEN.exists && EXPIRATION_TIME.value > 0;
});
    `,
    title: 'Computed State',
    description: 'Compute State depending on other States.',
    icon: 'edit',
  },
];

const StraightforwardView: React.FC = () => {
  return (
    <div className={styles.Container}>
      <div className={styles.Content}>
        <div className={styles.HeaderContainer}>
          <div className={styles.Tagline}>Why choose us?</div>
          <div className={styles.Title}>Straightforward</div>
          <Spacer height={20} />
          <div className={styles.Description}>
            AgileTs saves you the hassle of creating boilerplate code and offers
            a powerful api that makes your life easier.
          </div>
        </div>
        <Spacer height={60} />
        <SectionScroller sections={sections} startIndex={0} />
        <PlainButton
          to={'docs/introduction'}
          name={'Learn more'}
          className={styles.LearnMoreButton}
        />
      </div>
    </div>
  );
};

export default StraightforwardView;
