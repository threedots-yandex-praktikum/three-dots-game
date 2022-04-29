import React, { useRef, useEffect } from 'react';
import './style.scss';
import { SIZE_CANVAS } from './Game/settingsGame';
import { Game } from './Game/Game';

export const GamePlay = () => {
  const refCanvas = useRef(null);
  const refScreen = useRef(null);
  useEffect(() => {
    let sizeScreen = {
      w: 0,
      h: 0,
    };

    if (refScreen.current) {
      sizeScreen = {
        w: (refScreen.current as HTMLDivElement).clientWidth,
        h: (refScreen.current as HTMLDivElement).clientHeight,
      };
    }
    if (refCanvas?.current) {
      const ctx = (refCanvas.current as HTMLCanvasElement).getContext('2d');
      if (ctx) {

        const game = new Game(ctx, sizeScreen);
        game.start();
      }
    }
  }, []);

  return (
    <div ref={refScreen} className="playing-field">
      <canvas ref={refCanvas} width={SIZE_CANVAS} height={SIZE_CANVAS} />
    </div>
  );
};

