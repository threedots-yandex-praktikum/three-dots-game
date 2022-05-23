import React, { useRef, useEffect, useCallback, useState, useMemo } from 'react';
import './style.scss';
import { Game } from './Game/Game';
import { useHistory } from 'react-router-dom';
import { GAME_OVER_ROUTE, LEADERBOARD_ROUTE } from 'constants/routes';
import { CANVAS_SIZE_IN_PX } from 'pages/GamePlay/Game/settingsGame';
import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { Button, Flex } from '@chakra-ui/react';
import _isFunction from 'lodash/isFunction';
import _identity from 'lodash/identity';


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
  const unpauseCbRef = useRef<() => void>();
  const [isOpen, setIsOpen] = useState(false);

  const history = useHistory();
  const goToGameOverScreen = useCallback(
    () => history.push(GAME_OVER_ROUTE),
    [history],
  );

  const goToLeaderBoardScreen = useCallback(
    () => history.push(LEADERBOARD_ROUTE),
    [history],
  );

  const [ isInFullScreenMode, setIsInFullScreenMode ] = useState(false);
  const toggleFullScreenMode = useCallback(
    () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
          .then(() => setIsInFullScreenMode(true));
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen()
            .then(() => setIsInFullScreenMode(false));
        }
      }
    },
    [],
  );

  const continueGame = useCallback(
    () => {
      _isFunction(unpauseCbRef.current) && unpauseCbRef.current();
      setIsOpen(false);
    },
    [],
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
          onGameWin: () => {
            console.log('win');
            goToLeaderBoardScreen();
          },
          onGameOver: () => {
            console.log('lose');
            goToGameOverScreen();
          },
          onGamePause: (isGamePaused, unpauseCb) => {
            if(!isGamePaused) {
              return setIsOpen(false);
            }

            unpauseCbRef.current = unpauseCb;
            setIsOpen(true);
          },
          sendScoresData: scoresData => {

            // TODO здесь необходимо будет реализовать запись очков игрового сеанса в редакс
            console.log(scoresData);
          },
        });

        game.start();
      }
    }
  }, []);

  const PAUSE_MODAL_WINDOW_BTN_SCHEMA = useMemo(
    () => [
      {
        id: 'continueGame',
        title: 'Продолжить игру',
        onClick: continueGame,
      },
      {
        id: 'exitGame',
        title: 'Выход из игры',
        onClick: goToGameOverScreen,
      },
      {
        id: 'fullScreenMode',
        title: isInFullScreenMode ? 'Режим окна' : 'На весь экран',
        onClick: toggleFullScreenMode,
      },
    ],
    [continueGame, goToGameOverScreen, toggleFullScreenMode, isInFullScreenMode],
  );

  return (
    <div ref={refScreen} className="playing-field">
      <Modal isOpen={isOpen} onClose={_identity} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader mb={3}>Пауза</ModalHeader>
          <ModalBody>
            <Flex justifyContent="center" mb={3}>
              {
                PAUSE_MODAL_WINDOW_BTN_SCHEMA
                  .map(({ id, title, onClick }) => (
                    <Button
                      key={id}
                      mr={2}
                      onClick={onClick}
                    >
                      {title}
                    </Button>
                  ))
              }
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <canvas ref={refCanvas} width={CANVAS_SIZE_IN_PX} height={CANVAS_SIZE_IN_PX} />
    </div>
  );
};

