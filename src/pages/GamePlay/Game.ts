import { TDot } from "./types";
import { getRadians } from "./utils";
import { sizeCanvas } from "./settingsGame";
import { Dot } from "./Dot";

const radians = getRadians(360);
export class Game {
  ctx: CanvasRenderingContext2D;
  dots: TDot[] = [];
  countDots = 20;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  start() {
    this.initDots();
    this.drawDots();
  }

  initDots() {
    for (let index = 0; index < this.countDots; index++) {
      const dot = new Dot();
      this.dots.push(dot);
    }
  }

  private drawDots() {
    this.ctx.clearRect(0, 0, sizeCanvas, sizeCanvas);
    this.dots.forEach((dot) => {
      if (!dot.isActive) {
        return;
      }
      dot.updateCoordinates();
      this.handleIntersection(dot);

      this.ctx.beginPath();
      this.ctx.arc(dot.x, dot.y, dot.radius, 0, radians);
      this.ctx.fillStyle = dot.color;
      this.ctx.fill();
    });
    requestAnimationFrame(this.drawDots.bind(this));
  }

  handleIntersection(dot: TDot) {
    const dotIntersection = this.getIntersectionDot(dot);

    if (dotIntersection) {
      this.handleInteractionPhase(dot, dotIntersection);
    }

    if (dot.transitionRadius) {
      dot.increaseRadius();
    }
  }

  private getIntersectionDot(dot: TDot) {
    const dotIntersection = this.dots.find((dot2) => {
      if (dot2 === dot || !dot2.isActive) {
        return false;
      }
      const borderDot1 = {
        r: dot.x + dot.radius,
        l: dot.x - dot.radius,
        t: dot.y - dot.radius,
        b: dot.y + dot.radius,
      };

      const borderDot2 = {
        r: dot2.x + dot2.radius,
        l: dot2.x - dot2.radius,
        t: dot2.y - dot2.radius,
        b: dot2.y + dot2.radius,
      };
       // TODO условие квадрата... нужен круг.
      return (
        ((borderDot1.r > borderDot2.l && borderDot1.r < borderDot2.r) ||
          (borderDot1.l < borderDot2.r && borderDot1.l > borderDot2.l)) &&
        ((borderDot1.t < borderDot2.b && borderDot1.t > borderDot2.t) ||
          (borderDot1.b < borderDot2.t && borderDot1.b > borderDot2.b))
      );
    });
    return dotIntersection;
  }

  private handleInteractionPhase(dot: TDot, dotIntersection: TDot) {
    const totalArea = dot.getAreaCircle() + dotIntersection.getAreaCircle();
    if (dot.radius > dotIntersection.radius) {
      dot.setTransitionRadius(totalArea);
      dotIntersection.toggleActive();
    } else if (dot.radius < dotIntersection.radius) {
      dotIntersection.setTransitionRadius(totalArea);
      dot.toggleActive();
    } else {
      dotIntersection.rebound();
      dot.rebound();
    }
  }
}
