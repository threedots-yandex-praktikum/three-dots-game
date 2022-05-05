import { TBotSettings } from './types';
const SIZE_CANVAS = 3000;

const REDRAW_BOTS = 10;

const BOTS: TBotSettings[] = [
  {
    count: 10,
    minRadius: 30,
    maxRadius: 50,
  },
  {
    count: 20,
    minRadius: 15,
    maxRadius: 29,
  },
  {
    count: 500,
    minRadius: 5,
    maxRadius: 14,
  },
];

const COLORS_DOT: ReadonlyArray<string> = [
  '#FF4903',
  '#4378B',
  '#00E691',
  '#8157D1',
  '#000',
];

const DEFAULT_COLOR = '#000';

const COLOR_BG = '#fff';

const INITIAL_COORDINATES_PLAYER = {
  x:  SIZE_CANVAS/ 2,
  y: SIZE_CANVAS/ 2,
  radius: 10,
};


export {
  SIZE_CANVAS,
  REDRAW_BOTS,
  BOTS,
  COLORS_DOT,
  DEFAULT_COLOR,
  INITIAL_COORDINATES_PLAYER,
  COLOR_BG,
};
