import React from "react";
import styled from "styled-components";
import { FaGithub } from "react-icons/all";
import { useHistory } from "react-router-dom";

export type Props = { to: string };

const GithubButton: React.FC<Props> = (props) => {
  const { to } = props;
  const history = useHistory();

  return (
    <Container
      onClick={() => {
        if (to.startsWith("http")) {
          window.location.href = to;
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
  color: ${(props) => props.theme.on_surface};
  background-color: ${(props) => props.theme.surface};

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
    background-color: ${(props) => props.theme.surface_2};
  }
`;
