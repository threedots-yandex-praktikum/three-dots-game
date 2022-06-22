import { EThemesActions, TChangeThemeAction } from './types';

export const setLightAC = () => {
  return { type: EThemesActions.SET_LIGHT_THEME };
};
export const setDarkAC = () => {
  return { type: EThemesActions.SET_DARK_THEME };
};
export const changeThemeAC = (themeAsBoolean: boolean): TChangeThemeAction => {
  return { type: EThemesActions.CHANGE_THEME, payload: themeAsBoolean };
};
export const getThemeAC = (id: number, name: string) => {
  return { type: EThemesActions.GET_THEME, payload: { id, first_name: name } };
};
export const putThemeAC = (theme: number) => {
  return { type: EThemesActions.PUT_THEME, payload: theme };
};
