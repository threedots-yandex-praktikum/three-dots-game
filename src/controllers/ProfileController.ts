import { ProfileAPI, TChangePasswordData, TChangeProfileData } from '../modules/api/profileAPI';
import {TUserControllerClassError, UserControllerClass} from './UserController';


class ProfileControllerClass {
  public async changeProfile(data: TChangeProfileData) {
    try {
      const response = await ProfileAPI.changeProfile(data);

      UserControllerClass.setError(null);

      return response;
    } catch (error) {
      UserControllerClass.setError(error as TUserControllerClassError);
      return Promise.reject();
    }
  }

  public async changePassword(data: TChangePasswordData) {
    try {
      await ProfileAPI.changePassword(data);
    } catch (error) {
      UserControllerClass.setError(error as TUserControllerClassError);
      return Promise.reject();
    }
  }

  public async changeAvatar(data: FormData) {
    try {
      const { avatar } = await ProfileAPI.changeAvatar(data);

      UserControllerClass.setError(null);

      return avatar;
    } catch (error) {
      UserControllerClass.setError(error as TUserControllerClassError);
      return Promise.reject();
    }
  }
}

export const ProfileController = new ProfileControllerClass();
