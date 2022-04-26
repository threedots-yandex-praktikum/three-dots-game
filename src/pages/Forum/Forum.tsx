import React, { FC, useEffect } from 'react';
import './style.scss';


type ForumProps = Record<string, unknown>;


export const Forum: FC<ForumProps> = () => {
  useEffect(() => {
    // эмуляция ошибки
    throw new Error('error')
  })
  return (
    <div>
      форум
    </div>
  )
}

Forum.propTypes = {

};
