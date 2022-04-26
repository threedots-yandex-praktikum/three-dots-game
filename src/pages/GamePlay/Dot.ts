import { random } from "./utils";
import { sizeCanvas } from "./settingsGame";
import { getRadiusFromArea } from "./utils";
import { getRadians } from "./utils";

const MIN_RADIUS_DOT = 5;
const MAX_RADIUS_DOT = 20;
const COLORS_DOT: ReadonlyArray<string> = ["#FF4903", "#4378B", "#00E691", "#8157D1", "#000"];
const COUNT_COLOR = COLORS_DOT.length - 1;
const SPEED = 5;
const RADIANS = getRadians(360);
const DEFAULT_COLOR = '#000';
export class Dot {
  radius = 0
  private xyMax = sizeCanvas - this.radius;
  private xyMin = 0 + this.radius;
  x = 0;
  y = 0;  
  color: string |  null = null;
  private speedX = 0;
  private speedY = 0;

  //TODO рзанести на два класса бот и игрок
  isBot = true
  
  isActive = false;
  transitionRadius: number | null = null;

  init() {
    this.setBaseParams();

    this.moveFromEdge();
    this.isActive = true;
  }

  reInit() {
    this.setBaseParams();
    this.transitionRadius = this.radius
    this.radius = 0;
    this.isActive = true;
  }

  private setBaseParams() {
    this.radius = random(MIN_RADIUS_DOT, MAX_RADIUS_DOT);
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

  move() {
    const isBorderCanvasX =
      this.x >= sizeCanvas - this.radius || this.x <= 0 + this.radius;
    const isBorderCanvasY =
      this.y >= sizeCanvas - this.radius || this.y <= 0 + this.radius;
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
  
  moveFromEdge () {
    if (this.x + this.radius > sizeCanvas) {
      this.x = sizeCanvas - this.radius
    }
    if (this.x - this.radius < 0) {
      this.x = 0 + this.radius
    }
    if (this.y + this.radius > sizeCanvas) {
      this.y = sizeCanvas - this.radius
    }
    if (this.y - this.radius < 0) {
      this.y = 0 + this.radius
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
