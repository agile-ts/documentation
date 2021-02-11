import React from "react";
import styled from "styled-components";

export type Props = { uri: string };

const CodeSandBoxEmbed: React.FC<Props> = (props) => {
  const { uri } = props;

  return (
    <Embed
      src={`https://codesandbox.io/embed/${uri}?fontsize=14&hidenavigation=0&theme=light&view=preview`}
      title={"Code Sandbox"}
      allow={
        "geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
      }
      sandbox={
        "allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
      }
    />
  );
};

const Embed = styled.iframe`
  width: 100%;
  height: 500px;
  border: 0;
  border-radius: 4px;
  overflow: hidden;
`;

export default CodeSandBoxEmbed;
