import { TControl } from './types';

export enum ECODE_KEYBOARD {
  RIGHT = 'd',
  DOWN = 's',
  LEFT = 'a',
  UP = 'w',
}

export enum ECODE_DIRECTION {
  RIGHT = 'right',
  DOWN = 'down',
  LEFT = 'left',
  UP = 'up',
}
export const controlSettings: TControl = {
  right: {
    value: ECODE_KEYBOARD.RIGHT,
    isMoved: false,
    codeDirection: ECODE_DIRECTION.RIGHT,
  },
  down: {
    value: ECODE_KEYBOARD.DOWN,
    isMoved: false,
    codeDirection: ECODE_DIRECTION.DOWN,
  },
  left: {
    value: ECODE_KEYBOARD.LEFT,
    isMoved: false,
    codeDirection: ECODE_DIRECTION.LEFT,
  },
  up: {
    value: ECODE_KEYBOARD.UP,
    isMoved: false,
    codeDirection: ECODE_DIRECTION.UP,
  },
};

export const codeKeyboard: string[] =  Object.values(controlSettings).map((control) => {
  return control.value;
});
