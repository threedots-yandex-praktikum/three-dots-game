import { TBotSettings } from './types';
const CANVAS_SIZE_IN_PX = 3000;

const BOTS_TO_RE_INIT_AMOUNT = 10;

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
  '#3182CE',
  '#00E691',
  '#8157D1',
];

const DEFAULT_COLOR = '#555';

const COLOR_BG = '#fff';

const INITIAL_PLAYER_COORDINATES_IN_PX = {
  x:  CANVAS_SIZE_IN_PX/ 2,
  y: CANVAS_SIZE_IN_PX/ 2,
  radius: 10,
};


export {
  CANVAS_SIZE_IN_PX,
  BOTS_TO_RE_INIT_AMOUNT,
  BOTS,
  COLORS_DOT,
  DEFAULT_COLOR,
  INITIAL_PLAYER_COORDINATES_IN_PX,
  COLOR_BG,
};
