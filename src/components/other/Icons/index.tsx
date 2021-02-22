import React, { useState } from 'react';
import { FiStar, FiZap } from 'react-icons/all';

class IconKeyMap {
  star = (props) => <FiStar {...props} />;
  zap = (props) => <FiZap {...props} />;
}

type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T] &
  string;

export type IconTypes<
  T = IconKeyMap,
  M = FunctionPropertyNames<Required<T>>
> = M;

type Props = {
  type: IconTypes;
  className: string;
};

const Icons: React.FC<Props> = (props) => {
  const { type } = props;
  const [iconKeyMap] = useState(new IconKeyMap());

  return iconKeyMap[type](props) || <div>Icon '{type}' doesn't exists!</div>;
};

export default Icons;
