import { createState } from '@agile-ts/core';

export const ASTRONAUT_DARK = createState<boolean>(false).persist(
  'astronaut_color'
);
