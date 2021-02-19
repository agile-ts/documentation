import React from "react";
import styles from "./styles.module.css";
import Spacer from "../../../../components/other/Spacer";
import SectionScroller from "../../../../components/other/SectionScroller";
import { sections } from "./sections";

const StraightforwardView: React.FC = () => {
  return (
    <div className={styles.Container}>
      <Spacer height={10} />
      <SectionScroller sections={sections} startIndex={1} />
    </div>
  );
};

export default StraightforwardView;
