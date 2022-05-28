import { EGameActions, TGameAction, TGameState } from './types';

const initialState: TGameState = {
  player: {
    scores: 0,
    kills: 0,
  },
};

export const gameReducer = (
  state: TGameState = initialState,
  action: TGameAction,
): TGameState => {
  switch (action.type) {
  case EGameActions.SET_SCORE:
    return {
      ...state,
      player: { ...action.payload },
    };

  default:
    return state;
  }
};
