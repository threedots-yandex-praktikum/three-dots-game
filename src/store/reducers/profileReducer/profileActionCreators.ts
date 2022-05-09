import {
  TChangePasswordData,
  TChangeProfileData,
} from "modules/api/profileAPI";
import { EProfileActions, TProfileState } from "./types";

export const setUserAC = (data: TProfileState) => {
  return { type: EProfileActions.SET_USER, payload: data };
};

export const resetUserAC = () => {
  return { type: EProfileActions.RESET_USER };
};

export const changeProfileAC = (data: TChangeProfileData) => {
  return { type: EProfileActions.CHANGE_PROFILE, payload: data };
};

export const resetPasswordAC = (data: TChangePasswordData) => {
  return { type: EProfileActions.CHANGE_PASSWORD, payload: data };
};

export const changeAvatarAC = (data: FormData) => {
  return { type: EProfileActions.CHANGE_AVATAR, payload: data };
};
