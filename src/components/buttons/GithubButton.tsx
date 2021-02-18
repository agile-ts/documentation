import React from "react";
import { FaGithub } from "react-icons/all";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

export type Props = { to: string };

const GithubButton: React.FC<Props> = (props) => {
  const { to } = props;
  const history = useHistory();

  return (
    <Container
      onClick={() => {
        if (to.startsWith("http")) {
          window.open(to, "_blank");
          return;
        }
        history.push(to);
      }}
      {...props}
    >
      <Icon />
      <div>GITHUB</div>
    </Container>
  );
};

export default GithubButton;

const Icon = styled(FaGithub)`
  margin-right: 5px;
`;

const Container = styled.button`
  color: var(--ifm-color-on-surface);
  background-color: var(--ifm-color-surface);

  border-radius: 3px;
  border: none;

  font-size: 18px;
  font-weight: bold;

  cursor: pointer;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 15px 30px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3);

  transition: 0.3s ease all;

  &:hover {
    background-color: var(--ifm-color-surface-2);
  }
`;
