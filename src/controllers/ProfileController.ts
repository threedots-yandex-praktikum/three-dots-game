import {
  TChangePasswordData,
  TChangeProfileData,
} from 'modules/api/profileAPI';
import {
  changeAvatarAC,
  changeProfileAC,
  resetPasswordAC,
} from '../store/reducers/profileReducer/profileActionCreators';
import {
  TUserControllerClassError,
  UserControllerClass,
} from './UserController';
import { store } from '../store/store';
import { EMPTY_STRING } from 'constants/generalConst';

const { dispatch } = store;

class ProfileControllerClass {
  public async changeProfile(data: TChangeProfileData) {
    try {
      // TODO  ассинхронно
      dispatch(changeProfileAC(data));

      UserControllerClass.setError(null);
    } catch (error) {
      UserControllerClass.setError(error as TUserControllerClassError);
      return Promise.reject();
    }
  }

  public async changePassword(data: TChangePasswordData) {
    try {
      dispatch(resetPasswordAC(data));
    } catch (error) {
      UserControllerClass.setError(error as TUserControllerClassError);
      return Promise.reject();
    }
  }

  public async changeAvatar(data: FormData) {
    try {
      UserControllerClass.setError(null);
      dispatch(changeAvatarAC(data));

      return EMPTY_STRING;
    } catch (error) {
      UserControllerClass.setError(error as TUserControllerClassError);
      return Promise.reject();
    }
  }
}

export const ProfileController = new ProfileControllerClass();
