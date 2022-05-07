import {  TDotPlayer, TSizeScreen, TDot } from './types';
import { CANVAS_SIZE_IN_PX, COLOR_BG, DEFAULT_COLOR } from './settingsGame';
import { DotPlayer } from './Dot/DotPlayer';
import { codeKeyboard } from './controlSettings';
import { InteractionDots } from './Dots/InteractionDots';
import { getRadians } from './utils';

const RADIANS = getRadians(360);

type TGame = {
  ctx: CanvasRenderingContext2D,
  sizeScreen: TSizeScreen,
  onGameWin: () => void,
  onGameOver: () => void,
  onGamePause: (v: () => void) => void,
};

export class Game {
  ctx: CanvasRenderingContext2D;
  interactionDots: InteractionDots;
  dotPlayer: TDotPlayer;

  isGameFinished = false;
  isGamePaused = false;

  sizeScreen: TSizeScreen;

  onGameWin;
  onGameOver;
  onGamePause;

  callbackEvents: Record<string, ((event: KeyboardEvent) => void) > = {};

  constructor({
      ctx,
      sizeScreen,
      onGameWin,
      onGameOver,
      onGamePause,
  }: TGame) {
    this.ctx = ctx;
    this.dotPlayer = new DotPlayer();
    this.interactionDots = new InteractionDots(this.dotPlayer);
    this.sizeScreen = sizeScreen;
    this.onGameWin = onGameWin;
    this.onGameOver = onGameOver;
    this.onGamePause = onGamePause;
  }

  start() {
    this.drawGame();
    this.initGamePlayEventHandlers();
    this.reInitDotsBots();
  }

  stop() {
    this.isGameFinished = true;
    // TODO Сделать отдельный класс по управлению. Сейчас пока вот так убого вышло
    document.removeEventListener('keydown', this.callbackEvents.keydown);
    document.removeEventListener('keyup', this.callbackEvents.keyup);
  }

  private reInitDotsBots() {
    setTimeout(() => {
      this.interactionDots.reInitDotsBots();
      if (!this.isGameFinished) {
        this.reInitDotsBots();
      }
    }, 5000);
  }

  //TODO порефакторить логику подключения обработчиков
  private initGamePlayEventHandlers() {
    this.callbackEvents.keydown = (event: KeyboardEvent) => {
      if(event.key === 'Escape') {
        this.handleGamePause();
      }

      if (
        !Object.values(codeKeyboard).includes(event.key)
      ) {
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
    this.ctx.save();

    // перемещаем активный экран вслед за точкой
    this.ctx.translate(
      this.sizeScreen.w / 2 - this.dotPlayer.x,
      this.sizeScreen.h / 2 - this.dotPlayer.y,
    );
  }

  private handleGameWin() {
    this.stop();
    this.onGameWin();
  }
  private handleGameOver() {
    this.stop();
    this.onGameOver();
  }
  private handleGamePause() {
    const unpauseCb = () => {
      this.isGamePaused = false;
      requestAnimationFrame(this.drawGame.bind(this));
    };

    if(this.isGamePaused) {
      return unpauseCb();
    }

    this.isGamePaused = true;
    this.onGamePause(unpauseCb);
    return;
  }

  private drawGame() {
    if(this.isGamePaused) {
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
    this.drawScore();
    requestAnimationFrame(this.drawGame.bind(this));
  }

  private isVictory() {

    //условие победы. если у игрока самая большая точка, то выйграл.
    // TODO выглядит сомнительно. подумать, как переделать.
    return !this.interactionDots.dots.find((dot)=> {
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
        this.drawBaseDot(dot);
      }
    });
    this.ctx.restore();
  }

  // все отрисовки в классе Game потому что не хотела передавать управление контекстом canvas по всем классам. Но все равно остались спорные ощущения
  private drawBaseDot(dot: TDot) {
    this.ctx.beginPath();
    this.ctx.arc(dot.x, dot.y, dot.radius, 0, RADIANS);
    this.ctx.fillStyle = dot.color || DEFAULT_COLOR;
    this.ctx.fill();

  }

  private drawPlayerDot() {
    this.dotPlayer.move('');
    this.drawBaseDot(this.dotPlayer);
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = DEFAULT_COLOR;
    this.ctx.stroke();
  }

  private drawScore() {
    this.ctx.font = '30px Arial';
    this.ctx.fillStyle = '#805AD5';
    const scoresData = `Очки: ${this.dotPlayer.scores}`;
    this.ctx.fillText(scoresData, 10, 50);
    this.ctx.fillStyle = '#ED8936';
    const killsData = `Съедено: ${this.dotPlayer.kills}`;
    this.ctx.fillText(killsData, 10, 100);
  }

}
