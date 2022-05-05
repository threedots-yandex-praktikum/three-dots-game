import React from 'react';
import './style.scss';
import { TLogo } from './types';


const DOTS_IN_LOGO_AMOUNT = 3;

export const Logo = (props: TLogo) => {
  const size = props.size || 'm';
  const classDot = `dots__item dot dot--${size}`;
  return (
    <div className="dots">
      {
        Array
          .from(new Array(DOTS_IN_LOGO_AMOUNT))
          .map((_, index) => (
            <div key={index} className={classDot}></div>
          ))
      }
    </div>
  );
};
