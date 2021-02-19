import React, { useState } from "react";
import styles from "./styles.module.css";
import { useWindowSize } from "../../../hooks/useWindowSize";
import SectionRightItem from "./components/SectionRightItem";
import SectionLeftItem from "./components/SectionLeftItem";

export interface SectionInterface {
  code: string;
  title: string;
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

  const getTopByIndex = (index: number): number => {
    const m = [4, 0, 4];
    const scale = {
      0: 25 * (m[0] ?? 0),
      1: -25 * (m[1] ?? 0),
      2: -25 * (m[2] ?? 0),
    };

    return scale[index] ?? 0;
  };

  return (
    <div className={styles.SectionContainer}>
      <div className={styles.SectionInnerContainer}>
        <div className={styles.SectionLeftContainer}>
          <div
            className={styles.SectionOffset}
            style={{ top: getTopByIndex(index) }}
          >
            {sections.map((section, i) => {
              return (
                <SectionLeftItem code={section.code} active={index === i} />
              );
            })}
          </div>
        </div>
        <div className={styles.SectionRightContainer}>
          {sections.map((section, i) => {
            return (
              <SectionRightItem
                title={section.title}
                description={section.description}
                onClick={() => {
                  setIndex(i);
                }}
                icon={section.icon}
                active={index === i}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SectionScroller;
