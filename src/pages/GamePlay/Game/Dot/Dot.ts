import { SIZE_CANVAS } from '../settingsGame';
import { getRadiusFromArea } from '../utils';
import { TDotCoordinate  } from '../types';

const speedFactor = 25;
export abstract class Dot {
  radius = 0;
  x = 0;
  y = 0;
  color: string | null = null;
  isActive = false;
  transitionRadius: number | null = null;

  protected abstract setBaseParams() : void

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
    if (this.transitionRadius) {
      this.scaleRadius();
    }
  }

  scaleRadius() {
    if (!this.transitionRadius) {
      return;
    }
    if (this.radius < this.transitionRadius) {
      this.radius = Math.ceil(this.radius + (this.transitionRadius - this.radius) * 0.05);
      this.moveFromEdge();
    } else if (this.radius >= this.transitionRadius) {
      this.transitionRadius = null;
    }
  }

  moveFromEdge() {
    if (this.x + this.radius > SIZE_CANVAS) {
      this.x = SIZE_CANVAS - this.radius;
    }
    if (this.x - this.radius < 0) {
      this.x = 0 + this.radius;
    }
    if (this.y + this.radius > SIZE_CANVAS) {
      this.y = SIZE_CANVAS - this.radius;
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
