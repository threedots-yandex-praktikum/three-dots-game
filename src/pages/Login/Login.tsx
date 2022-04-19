import React, { FC } from 'react';
import PropTypes from 'prop-types';
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
