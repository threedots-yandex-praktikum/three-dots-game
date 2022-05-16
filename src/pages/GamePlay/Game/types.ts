import { Dot } from './Dot/Dot';
import { DotBot } from './Dot/DotBot';
import { DotPlayer } from './Dot/DotPlayer';
import { ECODE_KEYBOARD, ECODE_DIRECTION } from './controlSettings';
export type TDot = Dot
export type TDotBot = DotBot
export type TDotPlayer = DotPlayer

export type TBotSettings = {
  count: number,
  minRadius: number,
  maxRadius: number
}
export type TDirection = ECODE_DIRECTION;

export type TControl = Record<string, {
  value: ECODE_KEYBOARD,
  isMoved: boolean,
  codeDirection: TDirection
}>

export type TDotCoordinate = Pick<TDot, 'x' | 'y' | 'radius'>;

export type  TSizeScreen = {
  w: number,
  h: number
}
