import React, { FC, useRef, useEffect } from "react";
import "./style.scss";
import { GamePlayProps } from "./types";
import {
  sizeCanvas
} from './settingsGame'
import {Game} from './Game' 

export const GamePlay: FC<GamePlayProps> = () => {
  const ref = useRef(null);
  
  useEffect(() => {
    if (ref?.current) {
      const ctx = (ref.current as HTMLCanvasElement).getContext("2d");
      if (ctx) {
        const game = new Game(ctx, );
        game.start()

      }
    }
  }, []);

  return (
    <div className="playing-field">
      <canvas ref={ref} width={sizeCanvas} height={sizeCanvas} />
    </div>
  );
};

GamePlay.propTypes = {};
