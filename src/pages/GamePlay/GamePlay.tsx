import React, { FC, useRef, useEffect } from "react";
import "./style.scss";
import { TGamePlayProps } from "./types";
import {
  SIZE_CANVAS
} from './settingsGame'
import {Game} from './Game' 

export const GamePlay: FC<TGamePlayProps> = () => {
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
      <canvas ref={ref} width={SIZE_CANVAS} height={SIZE_CANVAS} />
    </div>
  );
};

GamePlay.propTypes = {};
