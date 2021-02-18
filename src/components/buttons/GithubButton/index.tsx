import React from "react";
import { FaGithub } from "react-icons/all";
import { useHistory } from "react-router-dom";
import styles from "./styles.module.css";
import clsx from "clsx";

export type Props = { to: string; className?: string };

const GithubButton: React.FC<Props> = (props) => {
  const { to, className } = props;
  const history = useHistory();

  return (
    <button
      className={clsx(styles.ButtonContainer, className)}
      onClick={() => {
        if (to.startsWith("http")) {
          window.location.href = to;
          return;
        }
        history.push(to);
      }}
    >
      <FaGithub className={styles.GithubIcon} />
      <div className={styles.Text}>GITHUB</div>
    </button>
  );
};

export default GithubButton;
