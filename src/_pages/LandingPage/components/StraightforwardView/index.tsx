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
const App = new Agile();
const MY_STATE = App.createState("Jeff");
MY_STATE.set("Frank");
    `,
    codeWithComment: `
// Create State
const App = new Agile();
const MY_STATE = App.createState("Jeff");
MY_STATE.set("Frank");
    `,
    title: 'Create State',
    description:
      'Create an Information we need to remember at a later point in time.',
    icon: 'zap',
  },
  {
    code: `
// MyComponent.whatever
const myState = useAgile(MY_STATE);
    `,
    codeWithComment: `
// Subscribe State in MyComponent.whatever
const myState = useAgile(MY_STATE);
    `,
    title: 'Subscribe State',
    description: 'Bind any State to any Component.',
    icon: 'repeat',
  },
  {
    code: `
const App = new Agile();
const MY_COLLECTION = App.createState();
MY_COLLECTION.collect({id: 1, name: "Jeff"});
    `,
    codeWithComment: `
// Create set of States
const App = new Agile();
const MY_COLLECTION = App.createState();
MY_COLLECTION.collect({id: 1, name: "Jeff"});
    `,
    title: 'Create set of States',
    description: 'Create a dynamic and reactive set of States.',
    icon: 'users',
  },
  {
    code: `
MY_STATE.persist();
    `,
    codeWithComment: `
// Persist State
MY_STATE.persist();
    `,
    title: 'Persist State',
    description: 'Store State permanently in any Storage.',
    icon: 'server',
  },
  {
    code: `
const App = new Agile();
const IS_AUTH = App.createComputed(() => {
   return AUTH_TOKEN.exists;
});
    `,
    codeWithComment: `
// Compute State    
const App = new Agile();
const IS_AUTH = App.createComputed(() => {
   return AUTH_TOKEN.exists;
});
    `,
    title: 'Compute State',
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
          <Spacer height={10} />
          <div className={styles.Title}>Straightforward</div>
          <Spacer height={20} />
          <div className={styles.Description}>
            AgileTs saves you the hassle of creating boilerplate code and offers
            powerful tools that make your life easier.
          </div>
        </div>
        <Spacer height={60} />
        <SectionScroller sections={sections} startIndex={1} />
        <PlainButton
          to={'docs/introduction'}
          name={'Find out more'}
          className={styles.FindOutMoreButton}
        />
      </div>
    </div>
  );
};

export default StraightforwardView;
