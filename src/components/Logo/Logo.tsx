import React from 'react';
import './style.scss';
import { TLogo } from './types';


export const Logo = (props: TLogo) => {
  const size = props.size || 'm';
  const classDot = `dots__item dot dot--${size}`;
  return (
    <div className="dots">
      <div className={classDot}></div>
      <div className={classDot}></div>
      <div className={classDot}></div>
    </div>
  );
};
