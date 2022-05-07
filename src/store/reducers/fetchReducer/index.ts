import { EFetchActions, TFetchAction, TStateFetch } from "./types";

const initialState = {
  isFetch: false,
};

export const fetchReducer = (
  state: TStateFetch = initialState,
  action: TFetchAction
) => {
  switch (action.type) {
    case EFetchActions.FETCH_ON:
      return { ...state, isFetch: true };
    case EFetchActions.FETCH_OFF:
      return { ...state, isFetch: false };
    default:
      return state;
  }
};
