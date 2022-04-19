import React, { FC } from 'react';
import PropTypes from 'prop-types';
import './style.scss';


type ForumProps = Record<string, unknown>;


export const Forum: FC<ForumProps> = () => {

  return (
    <div>
      форум
    </div>
  )
}

Forum.propTypes = {

};
