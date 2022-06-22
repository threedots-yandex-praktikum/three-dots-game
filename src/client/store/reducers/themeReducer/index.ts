import { DARK_THEME, LIGHT_THEME } from '../../../constants/themes';
import { EThemesActions, TThemesAction, TThemeState } from './types';

export const initialState: TThemeState = LIGHT_THEME;

export const themeReducer = (
  state: TThemeState = initialState,
  action: TThemesAction,
) => {
  switch (action.type) {
  case EThemesActions.SET_LIGHT_THEME: {
    return {
      ...state,
      ...LIGHT_THEME,
    };
  }
  case EThemesActions.SET_DARK_THEME:
    return {
      ...state,
      ...DARK_THEME,
    };
  default:
    return state;
  }
};
