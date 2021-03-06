import {
  TChangePasswordData,
  TChangeProfileData,
} from 'client/modules/api/profileAPI';
import {
  changeAvatarAC,
  changeProfileAC,
  resetPasswordAC,
} from 'client/store/reducers/profileReducer/profileActionCreators';
import {
  TUserControllerClassError,
  UserControllerClass,
} from './UserController';
import { EMPTY_STRING } from 'client/constants/generalConst';
import { store } from 'client/store/store';


const { dispatch } = store;

class ProfileControllerClass {
  public async changeProfile(data: TChangeProfileData, cb: () => void) {
    try {
      dispatch(changeProfileAC(data, cb));

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

  public async changeAvatar(data: FormData, cb: () => void) {
    try {
      UserControllerClass.setError(null);
      dispatch(changeAvatarAC(data, cb));

      return EMPTY_STRING;
    } catch (error) {
      UserControllerClass.setError(error as TUserControllerClassError);
      return Promise.reject();
    }
  }
}

export const ProfileController = new ProfileControllerClass();
