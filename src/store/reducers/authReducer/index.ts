import { ELoginActions, TAuthAction, TAuthState } from './types';

const initialState: TAuthState = {
  error: null,
};

export const authReducer = (
  state: TAuthState = initialState,
  action: TAuthAction,
) => {
  switch (action.type) {
  case ELoginActions.SET_ERROR:
    return { ...state, error: action.payload };
  case ELoginActions.LOGOUT:
    return { ...state, error: false };
  default:
    return state;
  }
};
