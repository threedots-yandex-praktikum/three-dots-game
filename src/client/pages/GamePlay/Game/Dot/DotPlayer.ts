import { random } from '../utils';
import {
  CANVAS_SIZE_IN_PX,
  COLORS_DOT,
  INITIAL_PLAYER_COORDINATES_IN_PX,
} from '../settingsGame';
import { Dot } from './Dot';
import { TDirection } from '../types';
import { controlSettings, ECODE_DIRECTION } from '../controlSettings';
const COUNT_COLOR = COLORS_DOT.length - 1;
export class DotPlayer extends Dot {
  constructor() {
    super();
    this.setBaseParams();
    this.correctCenterPositionAccordingNewDotRadius();
  }

  protected setBaseParams() {
    this.transitionRadius = INITIAL_PLAYER_COORDINATES_IN_PX.radius;
    this.color = COLORS_DOT[random(0, COUNT_COLOR)];
    this.x = INITIAL_PLAYER_COORDINATES_IN_PX.x;
    this.y = INITIAL_PLAYER_COORDINATES_IN_PX.y;
    this.isActive = true;

  }

  move (keyDirection: string) {
    super.move();
    const control = Object.values(controlSettings).find((control) => {
      return control.value === keyDirection;
    });

    if (!control || control.isMoved) {
      return;
    }
    control.isMoved = true;

    const _moveDot = function (this: DotPlayer) {
      const timerId = setTimeout(() => {
        this.editDirection(control.codeDirection);
        if (control.isMoved) {
          _moveDot();
        } else {
          clearTimeout(timerId);
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
    const coordEdge2 = CANVAS_SIZE_IN_PX - this.radius;
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
