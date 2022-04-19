import React, { FC } from 'react';
import PropTypes from 'prop-types';
import './style.scss';


type LeaderBoardProps = Record<string, unknown>;


export const LeaderBoard: FC<LeaderBoardProps> = () => {

  return (
    <div>
      таблица рекордов
    </div>
  )
}

LeaderBoard.propTypes = {

};
