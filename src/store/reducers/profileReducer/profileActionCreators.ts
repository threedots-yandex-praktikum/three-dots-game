import {
  TChangePasswordData,
  TChangeProfileData,
} from "modules/api/profileAPI";
import {
  EProfileActions,
  IChangeAvatarAction,
  IChangePasswordAction,
  IChangeProfileAction,
  TProfileState,
} from "./types";

export const setUserAC = (data: TProfileState) => {
  return { type: EProfileActions.SET_USER, payload: data };
};

export const resetUserAC = () => {
  return { type: EProfileActions.RESET_USER };
};

export const changeProfileAC = (
  data: TChangeProfileData,
  cb: () => void
): IChangeProfileAction => {
  return { type: EProfileActions.CHANGE_PROFILE, payload: data, cb };
};

export const resetPasswordAC = (
  data: TChangePasswordData
): IChangePasswordAction => {
  return { type: EProfileActions.CHANGE_PASSWORD, payload: data };
};

export const changeAvatarAC = (
  data: FormData,
  cb: () => void
): IChangeAvatarAction => {
  return { type: EProfileActions.CHANGE_AVATAR, payload: data, cb };
};
