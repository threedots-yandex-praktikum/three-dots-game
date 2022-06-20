import React, { useRef, useEffect, useCallback, useState, useMemo } from 'react';
import './style.scss';
import { Game } from './Game/Game';
import { useHistory } from 'react-router-dom';
import { GAME_OVER_ROUTE, LEADERBOARD_ROUTE } from 'client/constants/routes';
import { CANVAS_SIZE_IN_PX } from 'client/pages/GamePlay/Game/settingsGame';
import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { Button, Flex } from '@chakra-ui/react';
import _isFunction from 'lodash/isFunction';
import _identity from 'lodash/identity';
import { useAppDispatch } from 'client/hooks/useAppDispatch';
import { addUserToTableAC } from 'client/store/reducers/leaderBoardReducer/leaderBoardActionCreators';
import { setScoreAC } from 'client/store/reducers/gameReducer/gameActionCreators';
import { useAppSelector } from 'client/hooks/useAppSelector';


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
  const { id } = useAppSelector(state => state.profileReducer);
  const dispatch = useAppDispatch();

  const unpauseCbRef = useRef<() => void>();
  const stopGameCbRef = useRef<() => void>();

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

  const [isInFullScreenMode, setIsInFullScreenMode] = useState(false);
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
            if (id) {
              dispatch(addUserToTableAC());
            }
            goToLeaderBoardScreen();
          },
          onGameOver: () => {
            console.log('lose');
            if (id) {
              dispatch(addUserToTableAC());
            }

            goToGameOverScreen();
          },
          onGamePause: (isGamePaused, unpauseCb, stopGameCb) => {
            if(!isGamePaused) {
              return setIsOpen(false);
            }

            unpauseCbRef.current = unpauseCb;
            stopGameCbRef.current = stopGameCb;

            setIsOpen(true);
          },
          sendScoresData: scoresData => {
            dispatch(setScoreAC(scoresData.player));

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
        onClick: () => {
          _isFunction(stopGameCbRef.current) && stopGameCbRef.current();
          return goToGameOverScreen();
        },
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

