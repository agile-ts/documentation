import React, { useRef, useState } from "react";
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
  let sectionContainerRef = useRef(null);

  const [index, setIndex] = useState(startIndex);
  const [codeBlockRefs] = useState<{
    [key: string]: HTMLDivElement | null;
  }>({});

  const getTopByIndex = (index: number): number => {
    const topPadding = (sectionContainerRef.current?.clientHeight || 0) / 4;
    console.log(sectionContainerRef.current?.clientHeight);
    const spaceBetweenItems = 20;
    let totalHeight = 0;
    for (let i = 0; i < index; i++) {
      totalHeight += codeBlockRefs[i]?.clientHeight || 0;
    }
    return (
      -totalHeight -
      spaceBetweenItems * index -
      (codeBlockRefs[index]?.clientHeight || 0) / 2 +
      topPadding
    );
  };

  return (
    <div className={styles.SectionContainer} ref={sectionContainerRef}>
      <div className={styles.SectionInnerContainer}>
        <div className={styles.SectionLeftContainer}>
          <div
            className={styles.SectionOffset}
            style={{ top: getTopByIndex(index) }}
          >
            {sections.map((section, i) => {
              return (
                <SectionLeftItem
                  key={i}
                  forwardRef={(element) => {
                    codeBlockRefs[i] = element;
                  }}
                  code={section.code}
                  active={index === i}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.SectionRightContainer}>
          {sections.map((section, i) => {
            return (
              <SectionRightItem
                key={i}
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
