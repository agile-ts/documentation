import React, { useState } from "react";
import styles from "./styles.module.css";
import { useWindowSize } from "../../../hooks/useWindowSize";
import CodeBlock from "@theme/CodeBlock";

export interface SectionInterface {
  code: string;
  description: string;
  icon?: React.ComponentElement<any, any>;
}

export type Props = { sections: SectionInterface[]; startIndex?: number };

const SectionScroller: React.FC<Props> = (props) => {
  const { sections } = props;
  const startIndex =
    props.startIndex && props.startIndex < sections.length
      ? props.startIndex
      : Math.round(sections.length / 2);
  const { windowWidth } = useWindowSize();

  const [index, setIndex] = useState(startIndex);

  return (
    <div className={styles.SectionContainer}>
      <div className={styles.SectionInnerContainer}>
        <div className={styles.SectionLeftContainer}>
          <div className={styles.SectionOffset}>
            {sections.map((section) => {
              return (
                <div>
                  <CodeBlock>{section.code}</CodeBlock>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.SectionRightContainer}></div>
      </div>
    </div>
  );
};

export default SectionScroller;
