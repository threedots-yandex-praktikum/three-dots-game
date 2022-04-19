import React, { FC } from 'react';
import PropTypes from 'prop-types';
import './style.scss';


type ProfileProps = Record<string, unknown>;


export const Profile: FC<ProfileProps> = () => {

  return (
    <div>
      форма редактирования профиля
    </div>
  )
}

Profile.propTypes = {

};
