import React, { FC } from 'react';
import './style.scss';


type HomeProps = Record<string, unknown>;


export const Home: FC<HomeProps> = () => {

  return (
    <div>
      Стартовая страница с навигацией
    </div>
  )
}

Home.propTypes = {

};
