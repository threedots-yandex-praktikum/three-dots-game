import {  TDotPlayer, TSizeScreen, TDot } from './types';
import { SIZE_CANVAS, INITIAL_COORDINATES_PLAYER, COLOR_BG, DEFAULT_COLOR } from './settingsGame';
import { DotPlayer } from './Dot/DotPlayer';
import { codeKeyboard } from './controlSettings';
import { InteractionDots } from './Dots/InteractionDots';
import { getRadians } from './utils';

const RADIANS = getRadians(360);

export class Game {
  ctx: CanvasRenderingContext2D;
  interactionDots: InteractionDots;
  dotPlayer: TDotPlayer;
  gameFinished = false;
  sizeScreen: TSizeScreen;
  callbackEvents: Record<string, ((event: KeyboardEvent) => void) > = {};
  constructor(ctx: CanvasRenderingContext2D, sizeScreen: TSizeScreen) {
    this.ctx = ctx;
    this.dotPlayer = new DotPlayer();
    this.interactionDots = new InteractionDots(this.dotPlayer);
    this.sizeScreen = sizeScreen;
    this.initHandlerMotionPlayer();
  }

  start() {
    this.firstDraw();
    this.reInitDotsBots();
  }

  private firstDraw() {
    this.firstDrawPlayer();    
    if (this.dotPlayer.radius !== this.dotPlayer.transitionRadius) {
      requestAnimationFrame(this.firstDraw.bind(this));
    } else {
      this.firstDrawPlayer();
      setTimeout(() => {
        this.drawGame();        
      }, 400);
    }
  }

  private firstDrawPlayer() {
    this.prepareCanvas();
    this.drawPlayerDot();
    this.dotPlayer.move('');
    this.restoreCanvas();
  }

  stop() {
    this.gameFinished = true;

    // TODO Сделать отдельный класс по управлению. Сейчас пока вот так убого вышло
    document.removeEventListener('keydown', this.callbackEvents.keydown);
    document.removeEventListener('keyup', this.callbackEvents.keyup);
  }

  private reInitDotsBots() {
    setTimeout(() => {
      this.interactionDots.reInitDotsBots();
      if (!this.gameFinished) {
        this.reInitDotsBots();
      }
    }, 5000);
  }

  private initHandlerMotionPlayer() {
    this.callbackEvents.keydown = (event: KeyboardEvent) => {    
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
    this.ctx.clearRect(0, 0, SIZE_CANVAS, SIZE_CANVAS);
    this.ctx.rect(0, 0, SIZE_CANVAS, SIZE_CANVAS);
    this.ctx.fillStyle = COLOR_BG;
    this.ctx.fill();
    const shift = this.getShiftScreen();
    this.ctx.save();
    this.ctx.translate(-INITIAL_COORDINATES_PLAYER.x - shift.x + this.sizeScreen.w / 2, -INITIAL_COORDINATES_PLAYER.y - shift.y + this.sizeScreen.h / 2);
  }

  private drawGame() {
    if (!this.dotPlayer.isActive || this.isVictory()) {
      this.stop();
      return;
    }
    this.prepareCanvas();
    this.drawDots();    
    requestAnimationFrame(this.drawGame.bind(this));
  }

  private isVictory() {    
  //условие победы. если у игрока самая большая точка, то выйграл. 
  // TODO выглядит сомнительно. подумать, как переделать. 
    this.dotPlayer.radius;
    const dotBigRadius = this.interactionDots.dots.find((dot)=> {
      return this.dotPlayer.radius < dot.radius;
    });
    return !dotBigRadius;
  }

  private getShiftScreen () {
    const shiftX = this.dotPlayer.x - INITIAL_COORDINATES_PLAYER.x;
    const shiftY = this.dotPlayer.y - INITIAL_COORDINATES_PLAYER.y;
    const screenWithoutMove = {
      w: this.sizeScreen.w / 2 - 100,
      h: this.sizeScreen.h / 2 - 100,
    };
    const result ={
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
    this.restoreCanvas();
  }

  private restoreCanvas() {
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
    this.drawBaseDot(this.dotPlayer);
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = '#ffd700';
    this.ctx.stroke();
  }


}
