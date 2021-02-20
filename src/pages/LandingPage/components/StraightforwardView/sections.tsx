import React from 'react';
import { SectionInterface } from '../../../../components/other/SectionScroller';
import { FiEdit, FiRepeat, FiServer, FiUsers, FiZap } from 'react-icons/all';

export const sections: SectionInterface[] = [
  {
    code: `
    const App = new Agile();
    const MY_STATE = App.createState("Jeff");
    MY_STATE.set("Frank");
    `,
    title: 'Create State',
    description:
      'Create an Information we need to remember at a later point in time.',
    icon: <FiZap />,
  },
  {
    code: `
    // MyComponent.whatever
    const myState = useAgile(MY_STATE);
    `,
    title: 'Subscribe State',
    description: 'Bind any State to any Component.',
    icon: <FiRepeat />,
  },
  {
    code: `
     const App = new Agile();
     const MY_COLLECTION = App.createState();
     MY_COLLECTION.collect({id: 1, name: "Jeff"})
    `,
    title: 'Create set of States',
    description: 'Create a dynamic and reactive set of States.',
    icon: <FiUsers />,
  },
  {
    code: `
    MY_STATE.persist();
    `,
    title: 'Persist State',
    description: 'Store State permanently in any Storage.',
    icon: <FiServer />,
  },
  {
    code: `
     const App = new Agile();
     const IS_AUTH = App.createComputed(() => {
        return AUTH_TOKEN.exists;
     });
    `,
    title: 'Compute State',
    description: 'Compute State depending on other States.',
    icon: <FiEdit />,
  },
];
