import React from "react";
import styles from "./styles.module.css";
import clsx from "clsx";
import CodeBlock from "@theme/CodeBlock";

export type Props = {
  forwardRef?: React.LegacyRef<HTMLDivElement>;
  code: string;
  active: boolean;
};

const SectionLeftItem: React.FC<Props> = (props) => {
  const { code, active, forwardRef } = props;

  return (
    <div
      ref={forwardRef}
      className={clsx(styles.Container, {
        [styles.Container_Active]: active,
      })}
    >
      <CodeBlock className={"javascript"}>{code}</CodeBlock>
    </div>
  );
};

export default SectionLeftItem;
