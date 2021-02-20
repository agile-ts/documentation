import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';
import { useWindowSize } from '../../../hooks/useWindowSize';
import SectionRightItem from './components/SectionRightItem';
import SectionLeftItem from './components/SectionLeftItem';
import { FiChevronDown, FiChevronUp } from 'react-icons/all';

export interface SectionInterface {
  codeWithComment?: string;
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
  const [showTopChevron, setShowTopChevron] = useState(false);
  const [showBottomChevron, setShowBottomChevron] = useState(false);

  const [index, setIndex] = useState(startIndex);
  const [codeBlockRefs] = useState<{
    [key: string]: HTMLDivElement | null;
  }>({});

  useEffect(() => {
    setShowBottomChevron(windowWidth < 768);
    setShowTopChevron(windowWidth < 768);
  }, [windowWidth]);

  const calculateTop = (index: number): number => {
    const topPadding =
      (sectionContainerRef.current?.clientHeight || 0) / 2.5 -
      (codeBlockRefs[index]?.clientHeight || 0) / 2;
    const spaceBetweenItems = 20;
    let totalHeight = 0;
    for (let i = 0; i < index; i++) {
      totalHeight += codeBlockRefs[i]?.clientHeight || 0;
    }
    return -totalHeight - spaceBetweenItems * index + topPadding;
  };

  const handleChevronClick = useCallback(
    (up: boolean) => {
      let newIndex = 0;
      if (up) {
        newIndex = Math.max(index - 1, 0);
      } else {
        newIndex = Math.min(index + 1, sections.length - 1);
      }

      setShowTopChevron(newIndex !== 0);
      setShowBottomChevron(newIndex !== sections.length - 1);
      setIndex(newIndex);
    },
    [index, sections]
  );

  return (
    <div className={styles.SectionContainer} ref={sectionContainerRef}>
      <div
        className={styles.ChevronContainer}
        style={{
          visibility: showTopChevron ? 'visible' : 'hidden',
        }}
        onClick={() => {
          handleChevronClick(true);
        }}>
        <FiChevronUp />
      </div>
      <div className={styles.SectionInnerContainer}>
        <div className={styles.SectionLeftContainer}>
          <div
            className={styles.SectionOffset}
            style={{ top: calculateTop(index) }}>
            {sections.map((section, i) => {
              return (
                <SectionLeftItem
                  key={i}
                  forwardRef={(element) => {
                    codeBlockRefs[i] = element;
                  }}
                  code={
                    windowWidth < 768
                      ? section.codeWithComment || section.code
                      : section.code
                  }
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
      <div
        className={styles.ChevronContainer}
        style={{
          visibility: showBottomChevron ? 'visible' : 'hidden',
        }}
        onClick={() => {
          handleChevronClick(false);
        }}>
        <FiChevronDown />
      </div>
    </div>
  );
};

export default SectionScroller;
