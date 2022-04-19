import React, { FC } from 'react';
import PropTypes from 'prop-types';
import './style.scss';


type RegisterProps = Record<string, unknown>;


export const Register: FC<RegisterProps> = () => {

  return (
    <div>
      форма регистрации
    </div>
  )
}

Register.propTypes = {

};
