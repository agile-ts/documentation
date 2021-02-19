import React from "react";
import { SectionInterface } from "../../../../components/other/SectionScroller";
import { FaDiscord, FaGithub } from "react-icons/all";

export const sections: SectionInterface[] = [
  {
    code: `
    const App = new Agile();
    const MY_STATE = App.createState("Jeff");
    MY_STATE.set("Frank");
    `,
    title: "Create State",
    description: "Assigns last assigned Value to State",
    icon: <FaGithub />,
  },
  {
    code: `
    // MyComponent.whatever
    const myState = useAgile(MY_STATE);
    `,
    title: "Subscribe State to Component",
    description: "Assings initial Value to State",
    icon: <FaDiscord />,
  },
  {
    code: `
     const App = new Agile();
     const MY_COLLECTION = App.createState();
     MY_COLLECTION.collect({id: 1, name: "Jeff"})
    `,
    title: "Create set of States",
    description: "Assings initial Value to State",
    icon: <FaDiscord />,
  },
  {
    code: `
    MY_STATE.persist();
    `,
    title: "Persist State",
    description: "Stores State permanently in any Storage",
  },
];
