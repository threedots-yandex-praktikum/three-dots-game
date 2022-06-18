export type TThemeState = {
  theme: number;
  mainColorText: string;
  secondColorText: string;
  bgColorThird: string;
  greenColorText: string;
  bgColor: string;
  secondBgColor: string;
  mainColor: string; //purpure
  bgColorSecond: string;
};

export enum EThemesActions {
  SET_LIGHT_THEME = "SET_LIGHT_THEME",
  SET_DARK_THEME = "SET_DARK_THEME",
  CHANGE_THEME = "CHANGE_THEME",
  GET_THEME = "GET_THEME",
}
export interface TSetLightAction {
  type: EThemesActions.SET_LIGHT_THEME;
}
export interface TSetDarkAction {
  type: EThemesActions.SET_DARK_THEME;
}
export interface TGetThemeAction {
  type: EThemesActions.GET_THEME;
}
export interface TChangeThemeAction {
  type: EThemesActions.CHANGE_THEME;
  payload: boolean;
}
export type TThemesAction =
  | TSetLightAction
  | TSetDarkAction
  | TGetThemeAction
  | TChangeThemeAction;
