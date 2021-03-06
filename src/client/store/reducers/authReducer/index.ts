import { ELoginActions, TAuthAction, TAuthState } from './types';

export const initialState: TAuthState = {
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
    return { ...state, error: null };
  default:
    return state;
  }
};
