import React from "react";

export type Props = { height: number };

const Spacer: React.FC<Props> = (props) => {
  const height = props.height || 100;

  return <div style={{ height: height }} />;
};

export default Spacer;
