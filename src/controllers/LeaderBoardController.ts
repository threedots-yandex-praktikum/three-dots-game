import { TAddToLBData, TGet3DotsLBData } from "../modules/api/leaderBoardAPI";
// import { store } from "store/store";
// const { dispatch } = store;
class LeaderBoardControllerClass {
  public async addUser(data: TAddToLBData, cb: () => void) {
    try {
      // dispatch();
    } catch (error) {
      return Promise.reject();
    }
  }

  public async getThreeDotsLeaders(data: TGet3DotsLBData) {
    try {
      // dispatch();
    } catch (error) {
      return Promise.reject();
    }
  }
}

export const ProfileController = new LeaderBoardControllerClass();
