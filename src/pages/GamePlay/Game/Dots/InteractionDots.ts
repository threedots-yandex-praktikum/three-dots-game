import { TDotBot, TDotPlayer, TDot } from '../types';
import { BOTS_TO_RE_INIT_AMOUNT,
  INITIAL_PLAYER_COORDINATES_IN_PX, BOTS } from '../settingsGame';
import { DotBot } from '../Dot/DotBot';
import { DotPlayer } from '../Dot/DotPlayer';

export class InteractionDots {
  dots: (TDotBot | TDotPlayer)[] = [];
  gameFinished = false;
  dotPlayer: TDotPlayer;
  constructor(dotPlayer: TDotPlayer) {
    this.dotPlayer = dotPlayer;
    this.initDotsBots();
    this.dots.push(dotPlayer);
  }

  initDotsBots() {
    BOTS.forEach((settingsBot) => {
      for (let index = 0; index < settingsBot.count; index++) {
        const dot = new DotBot(settingsBot.minRadius, settingsBot.maxRadius, this.dotPlayer || INITIAL_PLAYER_COORDINATES_IN_PX);
        this.dots.push(dot);
      }
    });
  }

  reInitDotsBots() {
    let countInitBots = 0;

    for (let i = 0; i < this.dots.length; i++) {
      const dot = this.dots[i];

      if (
        countInitBots === BOTS_TO_RE_INIT_AMOUNT ||
        dot instanceof DotPlayer ||
        dot.isActive
      ) {
        continue;
      }

      dot.reInit();
      countInitBots++;
    }
  }


  handleIntersection(dot: TDot) {
    const dotIntersection = this.getIntersectionDot(dot);

    if (dotIntersection) {
      this.handleInteractionPhase(dot, dotIntersection);
    }
  }

  handleDanger(dot: TDotBot) {
    const dangerousDot = this.getDangerousDot(dot);

    if (dangerousDot && dot.isDanger(dangerousDot)) {
      dot.runAway();
    }
  }

  private getDangerousDot(dot: TDotBot) {
    const dotIntersection = this.dots.find((dot2) => {
      if (dot2 === dot || !dot2.isActive) {
        return false;
      }
      return dot.isDotWarning(dot2);
    });
    return dotIntersection;
  }

  private getIntersectionDot(dot: TDot) {
    const dotIntersection = this.dots.find((dot2) => {
      if (dot2 === dot || !dot2.isActive) {
        return false;
      }
      return dot.isDotIntersection(dot2);
    });
    return dotIntersection;
  }

  private handleInteractionPhase(dot: TDot, dotIntersection: TDot) {
    const totalArea = dot.getAreaCircle() + dotIntersection.getAreaCircle();
    if (dot.radius > dotIntersection.radius) {
      dot.setTransitionRadius(totalArea);
      dot.kills += 1;
      dot.scores = Math.round(dotIntersection.getAreaCircle());
      dotIntersection.toggleActive();
    } else if (dot.radius < dotIntersection.radius) {
      dotIntersection.setTransitionRadius(totalArea);
      dotIntersection.kills += 1;
      dotIntersection.scores = Math.round(dot.getAreaCircle());
      dot.toggleActive();
    } else {
      if (dotIntersection instanceof DotBot) {
        dotIntersection.rebound();
      }
      if (dot instanceof DotBot) {
        dot.rebound();
      }
    }
  }

  handleMovePhase() {
    this.dots.forEach((dot) => {
      if (!dot.isActive) {
        return;
      }
      if (dot instanceof DotBot) {
        dot.move();
        this.handleDanger(dot);
      }

      this.handleIntersection(dot);
    });
  }
}
