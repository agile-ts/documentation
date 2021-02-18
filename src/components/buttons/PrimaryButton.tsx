import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

export type Props = { to: string };

const PrimaryButton: React.FC<Props> = (props) => {
  const { to, children } = props;
  const history = useHistory();

  return (
    <Button
      onClick={() => {
        if (to.startsWith("http")) {
          window.open(to, "_blank");
          return;
        }
        history.push(to);
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;

const Button = styled.button`
  color: var(--ifm-color-on-primary);
  background-color: var(--ifm-color-primary);
  border-radius: 3px;
  border: none;

  font-size: 18px;
  font-weight: bold;

  cursor: pointer;

  padding: 15px 30px;
  align-items: center;
  justify-content: center;

  transition: 0.3s ease all;

  &:hover {
    background-color: var(--ifm-color-primary-lighter);
  }
`;
