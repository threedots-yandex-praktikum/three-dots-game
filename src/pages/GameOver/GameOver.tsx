import React, { FC } from 'react';
import './style.scss';


type GameOverProps = Record<string, unknown>;


export const GameOver: FC<GameOverProps> = () => {

  return (
    <div>
      страница после завершения игры
    </div>
  )
}

GameOver.propTypes = {

};
