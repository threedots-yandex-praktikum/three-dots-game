import { TSignUpData } from "modules/api/authAPI";
import {
  TChangePasswordData,
  TChangeProfileData,
} from "modules/api/profileAPI";

export enum EProfileActions {
  SET_USER = "SET_USER",
  RESET_USER = "RESET_USER",
  CHANGE_PASSWORD = "CHANGE_PASSWORD",
  CHANGE_PROFILE = "CHANGE_PROFILE",
  CHANGE_AVATAR = "CHANGE_AVATAR",
}
export type TProfileState = Omit<TSignUpData, "password"> & {
  id?: number | undefined;
};

interface ISetUserAction {
  type: EProfileActions.SET_USER;
  payload: TProfileState;
}
interface IResetUserAction {
  type: EProfileActions.RESET_USER;
}
interface IChangePasswordAction {
  type: EProfileActions.CHANGE_PASSWORD;
  payload: TChangePasswordData;
}
interface IChangeProfileAction {
  type: EProfileActions.CHANGE_PROFILE;
  payload: TChangeProfileData;
}

interface IChangeAvatarAction {
  type: EProfileActions.CHANGE_AVATAR;
  payload: FormData;
}
export type TProfileAction =
  | ISetUserAction
  | IResetUserAction
  | IChangePasswordAction
  | IChangeProfileAction
  | IChangeAvatarAction;
