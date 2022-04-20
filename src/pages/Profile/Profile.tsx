import React, { FC } from 'react';
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
