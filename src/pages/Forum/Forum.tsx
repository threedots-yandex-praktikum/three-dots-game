import React, { useEffect } from 'react';
import './style.scss';


export const Forum = () => {
  useEffect(() => {
    // эмуляция ошибки
    throw new Error('error');
  });
  return (
    <div>
      форум
    </div>
  );
};

Forum.propTypes = {

};
