import React, { useRef, useEffect, useCallback } from 'react';
import './style.scss';
import { Game } from './Game/Game';
import { useHistory } from 'react-router-dom';
import { GAME_OVER_ROUTE } from 'constants/routes';
import { CANVAS_SIZE_IN_PX } from 'pages/GamePlay/Game/settingsGame';
import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { Button } from '@chakra-ui/react';
import _isFunction from 'lodash/isFunction';


export const GamePlay = () => {
  const refCanvas = useRef(null);
  const refScreen = useRef(null);
  const unpauseCbRef = useRef(null);

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
          onGamePause: unpauseCb => {
            // @ts-ignore
            unpauseCbRef.current = unpauseCb;
          },
        });

        game.start();
      }
    }
  }, []);

  return (
    <div ref={refScreen} className="playing-field">
      <Modal isOpen onClose={() => { console.log('onCLose');}}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Пауза</ModalHeader>
          <ModalBody>
            {/*@ts-ignore*/}
            <Button onClick={() => _isFunction(unpauseCbRef.current) && unpauseCbRef.current()}>
              Продолжить игру
            </Button>
            <Button onClick={goToGameOverScreen}>
              Выход из игры
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      <canvas ref={refCanvas} width={CANVAS_SIZE_IN_PX} height={CANVAS_SIZE_IN_PX} />
    </div>
  );
};

