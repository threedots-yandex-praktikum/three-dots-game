import { EThemesActions } from "./types";

export const setLightAC = () => {
  return { type: EThemesActions.SET_LIGHT_THEME };
};

export const setDarkAC = () => {
  return { type: EThemesActions.SET_DARK_THEME };
};
