import React, { FC } from 'react';
import './style.scss';


type ForumProps = Record<string, unknown>;


export const Forum: FC<ForumProps> = () => {

  return (
    <div>
      форум
    </div>
  )
}

Forum.propTypes = {

};
