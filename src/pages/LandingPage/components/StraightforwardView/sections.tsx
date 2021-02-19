import React from "react";
import { SectionInterface } from "../../../../components/other/SectionScroller";
import { FaDiscord, FaGithub } from "react-icons/all";

export const sections: SectionInterface[] = [
  {
    code: "test1",
    description: "Test1",
    icon: <FaGithub />,
  },
  {
    code: "test2",
    description: "Test2",
    icon: <FaDiscord />,
  },
  {
    code: "test3",
    description: "Test3",
  },
];
