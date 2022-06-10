import React from 'react';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/scss/main.scss';


export const NotificationSystem = () => (
  <ToastContainer
      transition={Slide}
      newestOnTop
  />
);
