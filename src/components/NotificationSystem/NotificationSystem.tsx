import React from 'react';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/scss/main.scss';
import {FaRegUserCircle} from "react-icons/fa";
import {Icon, IconButton} from "@chakra-ui/react";




const CloseButton = ({ closeToast }: { closeToast: () => void }) => (
  <IconButton
    aria-label="notification-close-icon"
    colorScheme="purple"
    className="Toastify__close-icon"
    icon={<Icon as={FaRegUserCircle}/>}
    onClick={closeToast}
  />
);

export const NotificationSystem = () => (
  <ToastContainer
      transition={Slide}
      newestOnTop
      closeButton={CloseButton}
  />
);
