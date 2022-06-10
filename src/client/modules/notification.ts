import { toast, ToastOptions } from 'react-toastify';


export enum NOTIFICATION_LEVEL {
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
}

const {
  success,
  warning,
  info,
  error,
} = toast;

const NOTIFICATION_ACTIONS_BY_LEVEL = {
  [NOTIFICATION_LEVEL.SUCCESS]: success,
  [NOTIFICATION_LEVEL.WARNING]: warning,
  [NOTIFICATION_LEVEL.INFO]: info,
  [NOTIFICATION_LEVEL.ERROR]: error,
};

const DEFAULT_TOAST_OPTIONS = {
  position: 'bottom-right',
  renderDefaultComponent: true,
  draggable: false,
  hideProgressBar: true,
  icon: false,
  theme: 'colored',
};

export const sendNotification = (
  message: string,
  level: NOTIFICATION_LEVEL = NOTIFICATION_LEVEL.INFO,
  options = {},
) => {

  const transformedOptions = {
    ...DEFAULT_TOAST_OPTIONS,
    ...options,
    message,
  };

  const action = NOTIFICATION_ACTIONS_BY_LEVEL[level];

  return action(message, transformedOptions as ToastOptions);
};
