import React, { FC } from 'react';
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
