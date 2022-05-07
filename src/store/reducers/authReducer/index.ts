import { ELoginActions, TAuthAction, TAuthState } from "./types";

const initialState: TAuthState = {
  email: "",
  first_name: "",
  login: "",
  phone: "",
  second_name: "",
  avatar: "",
  display_name: "",
};

export const authReducer = (
  state: TAuthState = initialState,
  action: TAuthAction
) => {
  switch (action.type) {
    case ELoginActions.SET_USER:
      return { ...state, ...action.payload };
    case ELoginActions.LOGOUT:
      return { ...state, ...initialState };
    default:
      return state;
  }
};
