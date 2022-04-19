import React, { FC } from 'react';
import './style.scss';


type LoginProps = Record<string, unknown>;


export const Login: FC<LoginProps> = () => {

  return (
    <div>
      форма логина
    </div>
  )
}

Login.propTypes = {

};
