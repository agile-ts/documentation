import { App } from '../../app';

export const ASTRONAUT_DARK = App.createState<boolean>(false).persist(
  'astronaut_color'
);
