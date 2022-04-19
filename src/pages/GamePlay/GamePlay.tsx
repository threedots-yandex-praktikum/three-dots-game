import React, { FC } from 'react';
import './style.scss';


type GamePlayProps = Record<string, unknown>;


export const GamePlay: FC<GamePlayProps> = () => {

  return (
    <div>
      страница c игрой
    </div>
  )
}

GamePlay.propTypes = {

};
