import { random } from "./utils";
import { SIZE_CANVAS, COLORS_DOT, DEFAULT_COLOR } from "./settingsGame";
import { getRadiusFromArea } from "./utils";
import { getRadians } from "./utils";
import { TDot } from "./types";


const COUNT_COLOR = COLORS_DOT.length - 1;
const SPEED = 5;
const RADIANS = getRadians(360);
export class Dot {
  radius = 0;
  private xyMax = SIZE_CANVAS - this.radius;
  private xyMin = 0 + this.radius;
  x = 0;
  y = 0;
  color: string | null = null;
  speedX = 0;
  speedY = 0;

  //TODO рзанести на два класса бот и игрок
  isBot = true;

  isActive = false;
  transitionRadius: number | null = null;
  lastDotDanger: TDot | null = null;
  minRadius = 0
  maxRadius = 0

  constructor(minRadius: number, maxRadius: number) {
    this.minRadius = minRadius
    this.maxRadius = maxRadius
    this.setBaseParams();

    this.moveFromEdge();
    this.isActive = true;
  }

  isDodge(dangerousDot: TDot) {
    if (
      dangerousDot.radius > this.radius &&
      dangerousDot !== this.lastDotDanger
    ) {
      this.lastDotDanger = dangerousDot;
      return random(0,5);
    }
    return false;
  }

  reInit() {
    this.setBaseParams();
    this.transitionRadius = this.radius;
    this.radius = 0;
    this.isActive = true;
  }

  private setBaseParams() {
    // TODO не должны пересекаться с уже существующими
    this.radius = random(this.minRadius, this.maxRadius);
    this.color = COLORS_DOT[random(0, COUNT_COLOR)];
    this.x = random(this.xyMin, this.xyMax);
    this.y = random(this.xyMin, this.xyMax);
    this.speedX = random(-SPEED, SPEED) / this.getSpeedFactor();
    this.speedY = random(-SPEED, SPEED) / this.getSpeedFactor();
    if (this.speedX === 0 && this.speedY === 0) {
      this.speedX = SPEED / this.getSpeedFactor();
      this.speedY = SPEED / this.getSpeedFactor();
    }
  }

  getSpeedFactor(): number {
    // TODO нужна другая зависмость
    return this.radius / 3.5;
  }

  runAway() {
    //TODO замедлиться перед опасностью, и разогнаться в обратную сторону
    this.rebound()
  }

  move() {
    const isBorderCanvasX =
      this.x >= SIZE_CANVAS - this.radius || this.x <= 0 + this.radius;
    const isBorderCanvasY =
      this.y >= SIZE_CANVAS - this.radius || this.y <= 0 + this.radius;
    if (isBorderCanvasX) {
      this.speedX *= -1;
    }
    if (isBorderCanvasY) {
      this.speedY *= -1;
    }
    this.x += this.speedX;
    this.y += this.speedY;
  }

  getAreaCircle() {
    const radius = this.transitionRadius || this.radius;
    return Math.PI * radius * radius;
  }

  setTransitionRadius(area: number) {
    this.transitionRadius = getRadiusFromArea(area);
  }

  scaleRadius() {
    if (!this.transitionRadius) {
      return;
    }
    if (this.radius < this.transitionRadius) {
      this.radius = this.radius + (this.transitionRadius - this.radius) * 0.05;
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

  rebound() {
    this.speedY *= -1;
    this.speedX *= -1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, RADIANS);
    ctx.fillStyle = this.color || DEFAULT_COLOR;
    ctx.fill();
  }
}
