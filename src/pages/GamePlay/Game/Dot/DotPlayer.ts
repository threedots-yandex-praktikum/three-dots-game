import { random } from '../utils';
import {
  SIZE_CANVAS,
  COLORS_DOT,
  INITIAL_COORDINATES_PLAYER,
} from '../settingsGame';
import { Dot } from './Dot';
import { TDirection } from '../types';
import { controlSettings, ECODE_DIRECTION } from '../controlSettings';
const COUNT_COLOR = COLORS_DOT.length - 1;
export class DotPlayer extends Dot {
  constructor() {
    super();
    this.setBaseParams();
    this.moveFromEdge();
  }

  protected setBaseParams() {
    this.transitionRadius = INITIAL_COORDINATES_PLAYER.radius;
    this.color = COLORS_DOT[random(0, COUNT_COLOR)];
    this.x = INITIAL_COORDINATES_PLAYER.x;
    this.y = INITIAL_COORDINATES_PLAYER.y;
    this.isActive = true;

  }

  move (keyDirection: string) {
    super.move(keyDirection);
    const control = Object.values(controlSettings).find((control) => {
      return control.value === keyDirection;
    });

    if (!control || control.isMoved) {
      return;
    }
    control.isMoved = true;

    const _moveDot = function (this: DotPlayer) {
      setTimeout(() => {
        this.editDirection(control.codeDirection);
        if (control.isMoved) {
          _moveDot();
        }
      }, 25);
    }.bind(this);
    _moveDot();
  }

  stopMove(key: string) {
    const control = Object.values(controlSettings).find((control) => {
      return control.value === key;
    });
    if (control) {
      control.isMoved = false;
    }
  }

  editDirection(codeDirection: TDirection) {
    const coordEdge1 = 0 + this.radius;
    const coordEdge2 = SIZE_CANVAS - this.radius;
    const direction = 2 / this.getSpeedFactor();
    if (codeDirection === ECODE_DIRECTION.LEFT && this.x !== coordEdge1) {
      this.x -= direction;
    }
    if (codeDirection === ECODE_DIRECTION.RIGHT && this.x !== coordEdge2) {
      this.x += direction;
    }
    if (codeDirection === ECODE_DIRECTION.UP && this.y !== coordEdge1) {
      this.y -= direction;
    }
    if (codeDirection === ECODE_DIRECTION.DOWN && this.y !== coordEdge2) {
      this.y += direction;
    }
  }
}
