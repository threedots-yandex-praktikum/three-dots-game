import { random } from '../utils';
import { SIZE_CANVAS, COLORS_DOT } from '../settingsGame';
import { TDot, TDotCoordinate } from '../types';
import { Dot } from './Dot';

const COUNT_COLOR = COLORS_DOT.length - 1;
const DIRECTION = 10;
export class DotBot extends Dot {
  private xyMax = SIZE_CANVAS - this.radius;
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
    this.moveFromEdge();
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
    this.setBaseParams();
    this.transitionRadius = this.radius;
    this.radius = 0;
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

    this.directionX = random(-DIRECTION, DIRECTION) / this.getSpeedFactor();
    this.directionY = random(-DIRECTION, DIRECTION) / this.getSpeedFactor();
    if (this.directionX === 0 && this.directionY === 0) {
      this.directionX = DIRECTION / this.getSpeedFactor();
      this.directionY = DIRECTION / this.getSpeedFactor();
    }
    this.isActive = true;
  }

  runAway() {
    //TODO замедлиться перед опасностью, и разогнаться в обратную сторону
    this.rebound();
  }

  move() {
    const isBorderCanvasX =
      this.x >= SIZE_CANVAS - this.radius || this.x <= 0 + this.radius;
    const isBorderCanvasY =
      this.y >= SIZE_CANVAS - this.radius || this.y <= 0 + this.radius;
    if (isBorderCanvasX) {
      this.directionX *= -1;
    }
    if (isBorderCanvasY) {
      this.directionY *= -1;
    }
    this.x += this.directionX / DIRECTION;
    this.y += this.directionY / DIRECTION;
  }


  rebound() {
    this.directionY *= -1;
    this.directionX *= -1;
  }

}