import { all } from "redux-saga/effects";
import {
  watchSignIn,
  watchRegister,
  watchLogout,
  watchRegisterYa,
  watchSignInYa,
} from "./reducers/authReducer/sagaAuth";
import { watchOnFetch } from "./reducers/fetchReducer/sagaFetch";
import {
  watchCloseTopic,
  watchCreateTopic,
  watchGetCurrentTopic,
  watchGetTopics,
  watchSendMessage,
} from "./reducers/forumReducer/sagaForum";
import {
  watchAddUserToLB,
  watchLeaderBoard,
} from "./reducers/leaderBoardReducer/sagaLeaderBoard";
import {
  watchChangeAvatar,
  watchChangePassword,
  watchChangeProfile,
} from "./reducers/profileReducer/sagaProfile";
import {
  watchChangeTheme,
  watchGetTheme,
} from "./reducers/themeReducer/sagaTheme";

export default function* rootSaga() {
  yield all([
    watchSignIn(),
    watchOnFetch(),
    watchRegister(),
    watchLogout(),
    watchRegisterYa(),
    watchSignInYa(),
    watchChangeProfile(),
    watchChangeAvatar(),
    watchChangePassword(),
    watchGetTopics(),
    watchGetCurrentTopic(),
    watchCloseTopic(),
    watchCreateTopic(),
    watchSendMessage(),
    watchLeaderBoard(),
    watchAddUserToLB(),
    watchChangeTheme(),
    watchGetTheme(),
  ]);
}
