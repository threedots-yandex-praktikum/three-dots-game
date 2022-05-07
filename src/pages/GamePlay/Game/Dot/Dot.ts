import { CANVAS_SIZE_IN_PX } from '../settingsGame';
import { getRadiusFromArea } from '../utils';
import { TDotCoordinate  } from '../types';

const speedFactor = 10;
export abstract class Dot {
  radius = 0;
  x = 0;
  y = 0;
  color: string | null = null;
  isActive = false;
  transitionRadius: number | null = null;
  kills = 0;
  scores = 0;

  protected abstract setBaseParams() : void

  //TODO продумать формулу для корректной логики движения частиц разных размеров
  getSpeedFactor(): number {
    return this.radius / speedFactor;
  }

  getAreaCircle() {
    const radius = this.transitionRadius || this.radius;
    return Math.PI * radius * radius;
  }

  setTransitionRadius(area: number) {
    this.transitionRadius = getRadiusFromArea(area);
  }

  move(keyDirection: string) {
    if (!this.transitionRadius) {
      return;
    }

    if (this.radius < this.transitionRadius) {
      this.radius = Math.ceil(this.radius + (this.transitionRadius - this.radius) * 0.05);
      this.correctCenterPositionAccordingNewDotRadius();
    } else {
      this.transitionRadius = null;
    }
  }

  correctCenterPositionAccordingNewDotRadius() {
    if (this.x + this.radius > CANVAS_SIZE_IN_PX) {
      this.x = CANVAS_SIZE_IN_PX - this.radius;
    }
    if (this.x - this.radius < 0) {
      this.x = 0 + this.radius;
    }
    if (this.y + this.radius > CANVAS_SIZE_IN_PX) {
      this.y = CANVAS_SIZE_IN_PX - this.radius;
    }
    if (this.y - this.radius < 0) {
      this.y = 0 + this.radius;
    }
  }

  toggleActive() {
    this.isActive = !this.isActive;
  }

  getDistanceToOtherDot (dot: TDotCoordinate) {
    const x = this.x - dot.x;
    const y = this.y - dot.y;
    return Math.sqrt(x * x + y * y);
  }

  isDotIntersection(dot: TDotCoordinate) {
    const distance = this.getDistanceToOtherDot(dot);
    return distance < this.radius + dot.radius;
  }

  isDotWarning(dot: TDotCoordinate) {
    const radiusDanger = 20;
    const distance = this.getDistanceToOtherDot(dot);
    return distance < this.radius + dot.radius  + radiusDanger;
  }

}
