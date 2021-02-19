import React from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

export type Props = {
  ref?: React.LegacyRef<HTMLDivElement>;
  icon?: React.ComponentElement<any, any>;
  title: string;
  description: string;
  onClick: () => void;
  active: boolean;
};

const SectionRightItem: React.FC<Props> = (props) => {
  const { icon, title, description, onClick, active, ref } = props;

  return (
    <div
      ref={ref}
      className={clsx(styles.Container, {
        [styles.Container_Active]: active,
      })}
      onClick={onClick}
    >
      <h3 className={styles.Header}>
        {icon && <div className={styles.Icon}>{icon}</div>}
        {title}
      </h3>
      <p className={styles.Description}>{description}</p>
    </div>
  );
};

export default SectionRightItem;
