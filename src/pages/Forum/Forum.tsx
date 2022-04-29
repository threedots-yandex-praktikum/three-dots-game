import React, { useEffect } from 'react';


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
