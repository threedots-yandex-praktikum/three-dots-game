import { TSignUpData } from 'modules/api/authAPI';
import {
  TChangePasswordData,
  TChangeProfileData,
} from 'modules/api/profileAPI';

export enum EProfileActions {
  SET_USER = 'SET_USER',
  RESET_USER = 'RESET_USER',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
  CHANGE_PROFILE = 'CHANGE_PROFILE',
  CHANGE_AVATAR = 'CHANGE_AVATAR',
}
export type TProfileState = Omit<TSignUpData, 'password'> & {
  id?: number | undefined;
};

export type TServiceIdState = {
  service_id: string;
};

interface ISetUserAction {
  type: EProfileActions.SET_USER;
  payload: TProfileState;
}
interface IResetUserAction {
  type: EProfileActions.RESET_USER;
}
export interface IChangePasswordAction {
  type: EProfileActions.CHANGE_PASSWORD;
  payload: TChangePasswordData;
}
export interface IChangeProfileAction {
  type: EProfileActions.CHANGE_PROFILE;
  payload: TChangeProfileData;
  cb: () => void;
}

export interface IChangeAvatarAction {
  type: EProfileActions.CHANGE_AVATAR;
  payload: FormData;
  cb: () => void;
}
export type TProfileAction =
  | ISetUserAction
  | IResetUserAction
  | IChangePasswordAction
  | IChangeProfileAction
  | IChangeAvatarAction;
