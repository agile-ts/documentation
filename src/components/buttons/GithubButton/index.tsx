import React from "react";
import { FaGithub } from "react-icons/all";
import { useHistory } from "react-router-dom";
import styles from "./styles.module.scss";

export type Props = { to: string };

const GithubButton: React.FC<Props> = (props) => {
  const { to } = props;
  const history = useHistory();

  return (
    <button
      className={styles.buttonContainer}
      onClick={() => {
        if (to.startsWith("http")) {
          window.location.href = to;
          return;
        }
        history.push(to);
      }}
      {...props}
    >
      <FaGithub className={styles.githubIcon} />
      <div>GITHUB</div>
    </button>
  );
};

export default GithubButton;
