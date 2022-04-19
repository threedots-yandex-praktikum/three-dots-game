import React, { FC } from 'react';
import PropTypes from 'prop-types';
import './style.scss';


type GameStartProps = Record<string, unknown>;


export const GameStart: FC<GameStartProps> = () => {

  return (
    <div>
      страница с кнопкой запуска игры
    </div>
  )
}

GameStart.propTypes = {

};
