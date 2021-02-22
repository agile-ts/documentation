import React from 'react';
import { IconKeyMap } from './icons';

type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? K : never;
}[keyof T] &
  string;

export type IconTypes<
  T = typeof IconKeyMap,
  M = FunctionPropertyNames<Required<T>>
> = M;

type Props = {
  type: IconTypes;
  className: string;
};

const Icons: React.FC<Props> = (props) => {
  const { type } = props;

  return IconKeyMap[type](props) || <div>Icon '{type}' doesn't exists!</div>;
};

export default Icons;
