import { TDotPlayer, TSizeScreen, TDot } from './types';
import {
  CANVAS_SIZE_IN_PX,
  COLOR_BG,
  COLORS_DOT,
  DEFAULT_COLOR,
  INITIAL_PLAYER_COORDINATES_IN_PX,
  KILLS_STRING_COLOR,
  SCORES_STRING_COLOR,
} from './settingsGame';
import { DotPlayer } from './Dot/DotPlayer';
import { codeKeyboard } from './controlSettings';
import { InteractionDots } from './Dots/InteractionDots';
import { getRadians, random } from './utils';

const RADIANS = getRadians(360);
export const OBSTACLES_DATA = Array.from(new Array(random(10, 20))).map(() => ({
  x: random(-CANVAS_SIZE_IN_PX / 2, CANVAS_SIZE_IN_PX / 2),
  y: random(-CANVAS_SIZE_IN_PX / 2, CANVAS_SIZE_IN_PX / 2),
  radius: random(30, 140),
}));

type TPlayerSores = {
  kills: number;
  scores: number;
};

type TScoresData = {
  player: TPlayerSores;
  bots: TPlayerSores[];
};

type TGame = {
  ctx: CanvasRenderingContext2D,
  sizeScreen: TSizeScreen,
  onGameWin: () => void,
  onGameOver: () => void,
  onGamePause: (v1: boolean, v2: () => void, v3: () => void) => void,
  sendScoresData: (scoresData: TScoresData) => void,
};

export class Game {
  ctx: CanvasRenderingContext2D;
  interactionDots: InteractionDots;
  dotPlayer: TDotPlayer;

  isGameFinished = false;
  isGamePaused = false;

  sizeScreen: TSizeScreen;

  idRequestFrame = 0;

  onGameWin;
  onGameOver;
  onGamePause;
  sendScoresData;

  callbackEvents: Record<string, (event: KeyboardEvent) => void> = {};

  constructor({
    ctx,
    sizeScreen,
    onGameWin,
    onGameOver,
    onGamePause,
    sendScoresData,
  }: TGame) {
    this.ctx = ctx;
    this.dotPlayer = new DotPlayer();
    this.interactionDots = new InteractionDots(this.dotPlayer);    
    this.sizeScreen = sizeScreen;
    this.onGameWin = onGameWin;
    this.onGameOver = onGameOver;
    this.onGamePause = onGamePause;
    this.sendScoresData = sendScoresData;
  }

  start() {
    this.setAnimation();
    this.initGamePlayEventHandlers();
    this.reInitDotsBots();
  }

  stop() {
    this.isGameFinished = true;
    cancelAnimationFrame(this.idRequestFrame);
    /*
     * формируем данные по очкам для игрока и 20 ботов с лучшими результатами, и отправляем эти данные в sendScoresData
     * */
    const scoresData = {
      player: { kills: this.dotPlayer.kills, scores: this.dotPlayer.scores },
      bots: this.interactionDots.dots
        .sort((a, b) => b.scores - a.scores)
        .slice(0, 20)
        .map((dot) => ({ kills: dot.kills, scores: dot.scores })),
    };
    this.sendScoresData(scoresData);
    // collect users scores and kills data

    // TODO Сделать отдельный класс по управлению. 
    document.removeEventListener('keydown', this.callbackEvents.keydown);
    document.removeEventListener('keyup', this.callbackEvents.keyup);
  }

  private reInitDotsBots() {
    
    const timerId = setTimeout(() => {
      this.interactionDots.reInitDotsBots();
      if (!this.isGameFinished) {
        this.reInitDotsBots();
      } else {
        clearTimeout(timerId);
      }
    }, 5000);
  }

  private initGamePlayEventHandlers() {
    this.callbackEvents.keydown = (event: KeyboardEvent) => {
      
      if (event.key === 'p') {
        this.handleGamePause();
      }

      if (!Object.values(codeKeyboard).includes(event.key)) {
        return;
      }

      this.dotPlayer.move(event.key);
    };
    this.callbackEvents.keyup = (event: KeyboardEvent) => {
      this.dotPlayer.stopMove(event.key);
    };

    document.addEventListener('keydown', this.callbackEvents.keydown);
    document.addEventListener('keyup', this.callbackEvents.keyup);
  }

  private prepareCanvas() {
    this.ctx.clearRect(0, 0, CANVAS_SIZE_IN_PX, CANVAS_SIZE_IN_PX);
    this.ctx.rect(0, 0, CANVAS_SIZE_IN_PX, CANVAS_SIZE_IN_PX);
    this.ctx.fillStyle = COLOR_BG;
    this.ctx.fill();
    const shift = this.getShiftScreen();
    this.ctx.save();

    // перемещаем активный экран вслед за точкой, отступая от рамки вычисленный отступ
    this.ctx.translate(
      -INITIAL_PLAYER_COORDINATES_IN_PX.x - shift.x + this.sizeScreen.w / 2,
      -INITIAL_PLAYER_COORDINATES_IN_PX.y - shift.y + this.sizeScreen.h / 2,
    );
  }

  private getShiftScreen() {
    const shiftX = this.dotPlayer.x - INITIAL_PLAYER_COORDINATES_IN_PX.x;
    const shiftY = this.dotPlayer.y - INITIAL_PLAYER_COORDINATES_IN_PX.y;
    const thicknessFrame = 100;
    const screenWithoutMove = {
      w: this.sizeScreen.w / 2 - thicknessFrame,
      h: this.sizeScreen.h / 2 - thicknessFrame,
    };
    const result = {
      x: 0,
      y: 0,
    };
    if (shiftX > screenWithoutMove.w) {
      result.x = shiftX - screenWithoutMove.w;
    }
    if (shiftX < -screenWithoutMove.w) {
      result.x = shiftX + screenWithoutMove.w;
    }

    if (shiftY > screenWithoutMove.h) {
      result.y = shiftY - screenWithoutMove.h;
    }
    if (shiftY < -screenWithoutMove.h) {
      result.y = shiftY + screenWithoutMove.h;
    }
    return result;
  }

  private async handleGameWin() {
    // без  await saga  в this.onGameWin() срабатывает быстрее чем в this.stop()
    await this.stop();
    await this.onGameWin();
  }
  private async handleGameOver() {
    await this.stop();
    await this.onGameOver();
  }
  private handleGamePause() {
    const unpauseCb = () => {      
      this.isGamePaused = false;
      requestAnimationFrame(this.setAnimation.bind(this));
    };

    if (this.isGamePaused) {
      unpauseCb();
      return this.onGamePause(this.isGamePaused, unpauseCb, this.stop.bind(this));
    }

    this.isGamePaused = true;
    this.onGamePause(this.isGamePaused, unpauseCb, this.stop.bind(this));
  }

  private drawGame() {
    if (this.isGamePaused) {
      return;
    }

    if (this.isVictory()) {
      return this.handleGameWin();
    }

    if (this.isGameOver()) {
      return this.handleGameOver();
    }
    this.prepareCanvas();
    this.drawDots();
    this.drawObstacles();
    this.drawScore();
  }

  setAnimation() {
    const fps = 30;
    const interval = 1000 / fps;
    let lastTimeFrame = performance.now();
    const animationFrame = (currentTime: number) => {
      this.idRequestFrame = requestAnimationFrame(animationFrame);
      
      const delta = currentTime - lastTimeFrame;
      
      if (delta > interval) {
        this.drawGame();
        lastTimeFrame = lastTimeFrame + delta - delta%lastTimeFrame;
      }
    };

    animationFrame(lastTimeFrame);
  }

  private isVictory() {
    //условие победы. если у игрока самая большая точка, то выйграл.
    // TODO выглядит сомнительно. подумать, как переделать.
    return !this.interactionDots.dots.find((dot) => {
      return this.dotPlayer.radius < dot.radius;
    });
  }

  private isGameOver() {
    return !this.dotPlayer.isActive;
  }

  private drawDots() {
    this.interactionDots.handleMovePhase();
    this.interactionDots.dots.forEach((dot) => {
      if (!dot.isActive) {
        return;
      }
      if (dot instanceof DotPlayer) {
        this.drawPlayerDot();
      } else {
        this.drawBaseDot(dot, false);
      }
    });
    this.ctx.restore();
  }

  // все отрисовки в классе Game потому что не хотела передавать управление контекстом canvas по всем классам. Но все равно остались спорные ощущения
  private drawBaseDot(dot: TDot, isPlayer: boolean) {
    this.drawCircle(
      dot.x,
      dot.y,
      dot.radius,
      isPlayer ? '#ec128a' : dot.color || DEFAULT_COLOR,
    );
  }

  private drawPlayerDot() {
    this.dotPlayer.move('');
    this.drawBaseDot(this.dotPlayer, true);
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = DEFAULT_COLOR;
    this.ctx.stroke();
  }

  private drawScore() {
    this.ctx.font = '30px Arial';
    this.ctx.fillStyle = SCORES_STRING_COLOR;
    const scoresData = `Очки: ${this.dotPlayer.scores}`;
    this.ctx.fillText(scoresData, 10, 50);
    this.ctx.fillStyle = KILLS_STRING_COLOR;
    const killsData = `Съедено: ${this.dotPlayer.kills}`;
    this.ctx.fillText(killsData, 10, 100);
  }

  private drawObstacles() {
    return OBSTACLES_DATA.map(this.drawObstacle);
  }

  private drawObstacle = ({
    x,
    y,
    radius,
  }: {
    x: number;
    y: number;
    radius: number;
  }) => {
    const shift = this.getShiftScreen();

    /*
     * при расположении препятствия на игровом поле необходимо учитывать смещение окна просмотра относительно верхнего
     * левого угла экрана, т.к. окно движется за точкой пользователя
     * Поэтому используем расчет смещения, аналогичный расчету при отрисовке игрового поля и добавляем к этому значению
     * координаты препятствия (x, y)
     * */
    const centerXCoord =
      -INITIAL_PLAYER_COORDINATES_IN_PX.x - shift.x + this.sizeScreen.w / 2 + x;
    const centerYCoord =
      -INITIAL_PLAYER_COORDINATES_IN_PX.y - shift.y + this.sizeScreen.h / 2 + y;

    this.drawCircle(centerXCoord, centerYCoord, radius, COLORS_DOT[0]);
    this.drawCircle(
      centerXCoord,
      centerYCoord,
      (radius / 3) * 2,
      COLORS_DOT[1],
    );
    this.drawCircle(centerXCoord, centerYCoord, radius / 3, COLORS_DOT[2]);
  };

  private drawCircle(x: number, y: number, radius: number, fillColor: string) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, RADIANS);
    this.ctx.fillStyle = fillColor;
    this.ctx.fill();
  }
}
