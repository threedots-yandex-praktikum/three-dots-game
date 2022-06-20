import { TDotBot, TDotPlayer, TDot } from '../types';
import { BOTS_TO_RE_INIT_AMOUNT,
  INITIAL_PLAYER_COORDINATES_IN_PX, BOTS } from '../settingsGame';
import { DotBot } from '../Dot/DotBot';
import { DotPlayer } from '../Dot/DotPlayer';
import { OBSTACLES_DATA } from 'client/pages/GamePlay/Game/Game';
import { Dot } from '../Dot/Dot';

const MIN_DOT_AREA_SIZE_TO_INTERACT_WITH_OBSTACLE_IN_PX = 60;

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
      if (countInitBots === BOTS_TO_RE_INIT_AMOUNT) {
        return;
      }
      const dot = this.dots[i];

      if (
        dot instanceof DotPlayer ||
        dot.isActive
      ) {
        continue;
      }

      dot.reInit();
      countInitBots++;
    }
  }

  handleIntersection() {
    for (let i = 0; i < this.dots.length; i++) {
      const dot = this.dots[i] as Dot;
      if (!dot.isActive) {
        continue;
      }
      const dotIntersection = this.getIntersectionDot(dot, i);
      if (dotIntersection) {
        this.handleInteractionPhase(dot, dotIntersection);
        continue;
      }

      
      const obstacleIntersection = this.getIntersectionObstacle(dot);
      if (obstacleIntersection) {
        this.handleObstaclesInteractionPhase(dot, obstacleIntersection);
        continue;
      }
    }
  }

  handleDanger() {
    this.dots.forEach((dot, i) => {
      if (!dot.isActive || dot instanceof DotPlayer) {
        return;
      }
      const dangerousDot = this.getDangerousDot(dot, i);
      const dangerousObstacle = this.getDangerousObstacle(dot);

      if (dangerousObstacle || dangerousDot && dot.isDanger(dangerousDot as Dot)) {
        dot.runAway();
      }
    });
    


  }

  private getDangerousDot(dot: TDotBot, splitIndex: number) {
    for (let j = splitIndex+1; j < this.dots.length; j++) {
      const dotOther = this.dots[j];
      if (!dotOther.isActive) {
        continue;
      }
      const isDotIntersection = dot.isDotWarning(dotOther);
      if (isDotIntersection) {
        return dotOther;
      }
    }
  }

  private getDangerousObstacle(dot: TDotBot) {
    return OBSTACLES_DATA.find(obstacle => dot.isDotWarning(obstacle));
  }


  private getIntersectionDot(dot: TDot, splitIndex: number) {
    for (let j = splitIndex+1; j < this.dots.length; j++) {
      const dotOther = this.dots[j];
      if (!dotOther.isActive) {
        continue;
      }
      const isDotIntersection = dot.isDotIntersection(dotOther);
      if (isDotIntersection) {
        return dotOther;
      }
    }
  }

  private getIntersectionObstacle(dot: TDot) {
    return OBSTACLES_DATA.find(obstacle => dot.isDotIntersection(obstacle));
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

  private handleObstaclesInteractionPhase(dot: TDot, obstacleIntersection: Pick<TDot, 'x' | 'y' | 'radius'>) {
    const totalArea = dot.getAreaCircle();

    if(totalArea <= MIN_DOT_AREA_SIZE_TO_INTERACT_WITH_OBSTACLE_IN_PX) {
      return dot.isActive = false;
    }

    dot.inverseDirectionAndRollback(dot, obstacleIntersection);
    dot.setTransitionRadius(totalArea/2);
  }

  handleMovePhase() {
    this.handleIntersection();
    // this.handleDanger();
    
    this.dots.forEach((dot) => {
      if (!dot.isActive) {
        return;
      }
      if (dot instanceof DotBot) {
        dot.move();
      }
    });
  }
}
