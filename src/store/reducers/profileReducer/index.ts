import { EProfileActions, TProfileAction, TProfileState } from './types';

const initialState: TProfileState = {
  email: '',
  first_name: '',
  login: '',
  phone: '',
  second_name: '',
  avatar: '',
  display_name: '',
  id: undefined,
};

export const profileReducer = (
  state: TProfileState = initialState,
  action: TProfileAction,
) => {
  switch (action.type) {
  case EProfileActions.SET_USER:
    const {
        id,
        email,
        first_name,
        login,
        phone,
        second_name,
        avatar,
        display_name,
      } = action.payload;
    return {
      ...state,
      email,
      first_name,
      login,
      phone,
      second_name,
      avatar,
      display_name,
      id,
    };
  case EProfileActions.RESET_USER:
    return {
      ...state,
      email: '',
      first_name: '',
      login: '',
      phone: '',
      second_name: '',
      avatar: '',
      display_name: '',
      id: undefined,
    };
  default:
    return state;
  }
};
