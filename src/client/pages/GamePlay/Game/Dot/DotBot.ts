import { random } from '../utils';
import { CANVAS_SIZE_IN_PX, COLORS_DOT } from '../settingsGame';
import { TDot, TDotCoordinate } from '../types';
import { Dot } from './Dot';

const COUNT_COLOR = COLORS_DOT.length - 1;
const DIRECTION = 10;
export class DotBot extends Dot {
  private xyMax = CANVAS_SIZE_IN_PX - this.radius;
  private xyMin = 0 + this.radius;
  lastDotDanger: TDot | null = null;
  minRadius = 0;
  maxRadius = 0;
  directionX = 0;
  directionY = 0;
  coordPlayerDot: TDotCoordinate;
  constructor(minRadius: number, maxRadius: number, coordPlayerDot: TDotCoordinate) {
    super();
    this.minRadius = minRadius;
    this.maxRadius = maxRadius;
    this.coordPlayerDot = coordPlayerDot;
    this.setBaseParams();
    this.correctCenterPositionAccordingNewDotRadius();
  }

  isDanger(dangerousDot: TDot) {
    if (
      dangerousDot.radius > this.radius &&
      dangerousDot !== this.lastDotDanger
    ) {
      this.lastDotDanger = dangerousDot;
      return random(0, 5);
    }
    return false;
  }

  reInit() {
    this.transitionRadius = this.radius;
    this.radius = 0;
    this.kills = 0;
    this.scores = 0;
    this.setBaseParams();
    this.isActive = true;
  }

  protected setBaseParams() {
    this.radius = random(this.minRadius, this.maxRadius);
    this.color = COLORS_DOT[random(0, COUNT_COLOR)];
    this.x = random(this.xyMin, this.xyMax);
    this.y = random(this.xyMin, this.xyMax);

    if (this.isDotWarning(this.coordPlayerDot)) {
      this.x += random(this.xyMin, this.xyMax);
      this.y += random(this.xyMin, this.xyMax);
    }

    const speedFactor = this.getSpeedFactor();

    this.directionX = random(-DIRECTION, DIRECTION) / speedFactor;
    this.directionY = random(-DIRECTION, DIRECTION) / speedFactor;
    if (this.directionX === 0 && this.directionY === 0) {
      this.directionX = DIRECTION / speedFactor;
      this.directionY = DIRECTION / speedFactor;
    }
    this.isActive = true;
  }

  runAway() {
    //TODO замедлиться перед опасностью, и разогнаться в обратную сторону
    this.rebound();
  }

  move() {
    super.move();
    const isBorderCanvasX =
      this.x >= CANVAS_SIZE_IN_PX - this.radius || this.x <= 0 + this.radius;
    const isBorderCanvasY =
      this.y >= CANVAS_SIZE_IN_PX - this.radius || this.y <= 0 + this.radius;
    if (isBorderCanvasX) {
      this.directionX *= -1;
    }
    if (isBorderCanvasY) {
      this.directionY *= -1;
    }
    this.x += +(this.directionX / DIRECTION / this.getSpeedFactor()).toFixed(2);
    this.y += +(this.directionY / DIRECTION / this.getSpeedFactor()).toFixed(2);
  }


  rebound() {
    this.directionY *= -1;
    this.directionX *= -1;
  }

}
