import React, { FC } from 'react';
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
