import { TBotSettings } from "./types";
const SIZE_CANVAS = 1000;
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
    count: 30,
    minRadius: 5,
    maxRadius: 14,
  }
]

const COLORS_DOT: ReadonlyArray<string> = [
  "#FF4903",
  "#4378B",
  "#00E691",
  "#8157D1",
  "#000",
];

const DEFAULT_COLOR = "#000";

export {
  SIZE_CANVAS,
  REDRAW_BOTS,
  BOTS,
  COLORS_DOT,
  DEFAULT_COLOR
};
