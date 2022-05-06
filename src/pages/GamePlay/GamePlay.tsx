import React, {useRef, useEffect, useCallback, useState} from 'react';
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

  /*
  *  может показаться, что здесь реф для хранения колбэка лишний, но по факту оказывается, что
  * если использовать стейт для хранения колбэка снятия игры с паузы, столкнемся с проблемой, что при
  * установке на паузу модальник не открывается а скорость игры увеличивается, т.к. постоянно перерисовывается
  * компонент канваса из-за обновления локального стейта компонента. Вероятно можно использовать какой-то постоянный кей
  * чтобы отключить возможность обновления компонента канваса при обновлшении локального стейта компонента
  * */
  const unpauseCbRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

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
            setIsOpen(true);
          },
        });

        game.start();
      }
    }
  }, []);

  return (
    <div ref={refScreen} className="playing-field">
      <Modal isOpen={isOpen} onClose={() => { console.log('onCLose');}}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Пауза</ModalHeader>
          <ModalBody>
            <Button
              mr={2}
              onClick={() => {
                /*@ts-ignore*/
                _isFunction(unpauseCbRef.current) && unpauseCbRef.current();
                setIsOpen(false);
              }}
            >
              Продолжить игру
            </Button>
            <Button onClick={goToGameOverScreen}>
              Выход из игры
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
      <canvas key={111} ref={refCanvas} width={CANVAS_SIZE_IN_PX} height={CANVAS_SIZE_IN_PX} />
    </div>
  );
};

