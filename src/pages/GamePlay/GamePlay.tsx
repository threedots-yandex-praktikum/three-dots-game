import React, { FC } from 'react';
import PropTypes from 'prop-types';
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
