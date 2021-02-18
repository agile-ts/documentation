import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import HeaderTyper from "../../../../components/other/HeaderTyper";
import Spacer from "../../../../components/other/Spacer";
import PrimaryButton from "../../../../components/buttons/PrimaryButton";
import GithubButton from "../../../../components/buttons/GithubButton";
import styles from "./styles.module.css";

const HeaderView: React.FC = () => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <div className={styles.Container}>
      <div>
        <div className={styles.HeaderTitle}>Creating States</div>
        <Spacer height={25} />
        <div className={styles.SeparatorContainer}>
          <div className={styles.SeparatorLeft} />
          <div className={styles.SeparatorText}>should be</div>
          <div className={styles.SeparatorRight} />
        </div>
        <Spacer height={25} />
        <HeaderTyper
          words={[
            "simple",
            "straightforward",
            "fast",
            "understandable",
            "boilerplate free",
            "spacy",
            "fun",
          ]}
          delay={5000}
        />
        <Spacer height={50} />
        <div className={styles.DescriptionText}>
          {siteConfig.customFields.description}
        </div>
        <Spacer height={50} />
        <div className={styles.ButtonContainer}>
          <PrimaryButton className={styles.GetStartedButton} to={"/docs"}>
            GET STARTED
          </PrimaryButton>
          <GithubButton
            className={styles.GithubButton}
            to={siteConfig.customFields.githubUrl}
          />
        </div>
      </div>
      <img
        className={styles.AstronautImage}
        src={"img/astronaut-light.svg"}
        alt={"Astronaut"}
      />
    </div>
  );
};

export default HeaderView;
