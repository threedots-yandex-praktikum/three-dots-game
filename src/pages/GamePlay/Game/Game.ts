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
  constructor(ctx: CanvasRenderingContext2D, sizeScreen: TSizeScreen) {
    this.ctx = ctx;
    this.dotPlayer = new DotPlayer();
    this.interactionDots = new InteractionDots(this.dotPlayer);
    this.sizeScreen = sizeScreen;
  }

  start() {
    this.initHandlerMotionPlayer();
    this.drawGame();
    this.reInitDotsBots();
  }

  reInitDotsBots() {
    setTimeout(() => {
      this.interactionDots.reInitDotsBots();
      if (!this.gameFinished) {
        this.reInitDotsBots();
      }
    }, 5000);
  }

  initHandlerMotionPlayer() {
    document.addEventListener('keydown', (event) => {      
      if (
        !Object.values(codeKeyboard).includes(event.key)
      ) {
        return;
      }
      this.dotPlayer.move(event.key);
    });

    document.addEventListener('keyup', (event) => {
      this.dotPlayer.stopMove(event.key);
    });
  }

  private drawGame() {
    if (!this.dotPlayer.isActive) {
      this.gameFinished = true;
      return;
    }
    this.ctx.clearRect(0, 0, SIZE_CANVAS, SIZE_CANVAS);
    this.ctx.rect(0, 0, SIZE_CANVAS, SIZE_CANVAS);
    this.ctx.fillStyle = COLOR_BG;
    this.ctx.fill();
    this.drawDots();    
    requestAnimationFrame(this.drawGame.bind(this));
  }

  getShiftScreen () {
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
    const shift = this.getShiftScreen();
    this.ctx.save();
    this.ctx.translate(-INITIAL_COORDINATES_PLAYER.x - shift.x + this.sizeScreen.w / 2, -INITIAL_COORDINATES_PLAYER.y - shift.y + this.sizeScreen.h / 2);  
    this.interactionDots.handleMovePhase();
    this.interactionDots.dots.forEach((dot) => {
      if (!dot.isActive) {
        return;
      }
      this.drawBaseDot(dot);
    });
    this.ctx.restore();
  }

  drawBaseDot(dot: TDot) {
    this.ctx.beginPath();
    this.ctx.arc(dot.x, dot.y, dot.radius, 0, RADIANS);
    this.ctx.fillStyle = dot.color || DEFAULT_COLOR;
    this.ctx.fill();
    if (dot instanceof DotPlayer) {
      this.drawPlayerDot();
    }
  }

  drawPlayerDot() {
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = '#ffd700';
    this.ctx.stroke();
  }
}
