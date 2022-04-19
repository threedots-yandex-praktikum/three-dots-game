import React, { FC } from 'react';
import PropTypes from 'prop-types';
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
