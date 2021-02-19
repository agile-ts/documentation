import React from "react";
import { SectionInterface } from "../../../../components/other/SectionScroller";
import { FaDiscord, FaGithub } from "react-icons/all";

export const sections: SectionInterface[] = [
  {
    code: `
    const App = new Agile();
    const MY_STATE = App.createState("Jeff");
    MY_STATE.undo();
    `,
    title: "Undo State",
    description: "Assigns last assigned Value to State",
    icon: <FaGithub />,
  },
  {
    code: "MY_STATE.reset()",
    title: "Reset States",
    description: "Assings initial Value to State",
    icon: <FaDiscord />,
  },
  {
    code: "MY_STATE.persist()",
    title: "Persist States",
    description: "Stores State in any Storage",
  },
];
