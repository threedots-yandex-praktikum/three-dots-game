import React, { useRef, useEffect, useCallback } from 'react';
import './style.scss';
import { CANVAS_SIZE_IN_PX } from './Game/settingsGame';
import { Game } from './Game/Game';
import { useHistory } from 'react-router-dom';
import { GAME_OVER_ROUTE } from 'constants/routes';

export const GamePlay = () => {
  const refCanvas = useRef(null);
  const refScreen = useRef(null);

  const history = useHistory();
  const goToGameOverScreen = useCallback(
    () => history.push(GAME_OVER_ROUTE),
    [history],
  );

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

        const game = new Game({
          ctx,
          sizeScreen,
          onGameWin: () => console.log('win'),
          onGameOver: () => {
            console.log('lose');
            goToGameOverScreen();
          },
          onGamePause: () => console.log('pause'),
        });

        game.start();
      }
    }
  }, []);

  return (
    <div ref={refScreen} className="playing-field">
      <canvas ref={refCanvas} width={CANVAS_SIZE_IN_PX} height={CANVAS_SIZE_IN_PX} />
    </div>
  );
};

