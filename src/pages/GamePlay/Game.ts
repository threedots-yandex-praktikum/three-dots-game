import { TDot } from "./types";
import { SIZE_CANVAS, REDRAW_BOTS } from "./settingsGame";
import { Dot } from "./Dot";
import { BOTS } from './settingsGame'
export class Game {
  ctx: CanvasRenderingContext2D;
  dotsBots: TDot[] = [];

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  start() {
    this.initDotsBots();
    this.drawGame();
    setInterval(() => {
      this.reInitDotsBots();
    }, 5000);
  }

  initDotsBots() {
    BOTS.forEach((settingsBot) => {
      for (let index = 0; index < settingsBot.count; index++) {
        const dot = new Dot(settingsBot.minRadius, settingsBot.maxRadius);
        this.dotsBots.push(dot);
      }
    })

  }

  reInitDotsBots() {
    let countInitBoots = 0;

    for (let i = 0; i < this.dotsBots.length; i++) {
      if (countInitBoots === REDRAW_BOTS) {
        continue;
      }
      const dot = this.dotsBots[i];
      if (dot.isActive) {
        continue;
      }
      dot.reInit();
      countInitBoots++;
    }
  }

  private drawGame() {
    this.ctx.clearRect(0, 0, SIZE_CANVAS, SIZE_CANVAS);
    this.drawDotsBots();
    requestAnimationFrame(this.drawGame.bind(this));
  }

  private drawDotsBots() {
    this.dotsBots.forEach((dot) => {
      if (!dot.isActive) {
        return;
      }
      dot.move();
      if (dot.isBot) {
        this.handleDanger(dot);
      }
      this.handleIntersection(dot);
      dot.draw(this.ctx);
    });
  }
  handleIntersection(dot: TDot) {
    const dotIntersection = this.getIntersectionDot(dot);

    if (dotIntersection) {
      this.handleInteractionPhase(dot, dotIntersection);
    }

    if (dot.transitionRadius) {
      dot.scaleRadius();
    }
  }
  handleDanger(dot: TDot) {
    const dangerousDot = this.getDangerousDot(dot);

    if (dangerousDot && dot.isDodge(dangerousDot)) {
      dot.runAway()
    }
  }

  private getDangerousDot(dot: TDot) {
    const radiusDanger = 20;
    const dotIntersection = this.dotsBots.find((dot2) => {
      if (dot2 === dot || !dot2.isActive) {
        return false;
      }
      const x = dot.x - dot2.x;
      const y = dot.y - dot2.y;
      const distance = Math.sqrt(x * x + y * y);
      
      return distance < dot.radius + dot2.radius + radiusDanger;
    });
    return dotIntersection;
  }

  private getIntersectionDot(dot: TDot) {
    const dotIntersection = this.dotsBots.find((dot2) => {
      if (dot2 === dot || !dot2.isActive) {
        return false;
      }
      const x = dot.x - dot2.x;
      const y = dot.y - dot2.y;
      const distance = Math.sqrt(x * x + y * y);

      return distance < dot.radius + dot2.radius;
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
