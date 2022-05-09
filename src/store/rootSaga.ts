import { all } from "redux-saga/effects";
import {
  watchSignIn,
  watchRegister,
  watchLogout,
} from "./reducers/authReducer/sagaAuth";
import { watchOnFetch } from "./reducers/fetchReducer/sagaFetch";
import {
  watchCloseTopic,
  watchCreateTopic,
  watchGetCurrentTopic,
  watchGetTopics,
  watchSendMessage,
} from "./reducers/forumReducer/sagaForum";
import { watchLeaderBoard } from "./reducers/leaderBoardReducer/sagaLeaderBoard";
import {
  watchChangeAvatar,
  watchChangePassword,
  watchChangeProfile,
} from "./reducers/profileReducer/sagaProfile";

export default function* rootSaga() {
  yield all([
    watchSignIn(),
    watchOnFetch(),
    watchRegister(),
    watchLogout(),
    watchChangeProfile(),
    watchChangeAvatar(),
    watchChangePassword(),
    watchGetTopics(),
    watchGetCurrentTopic(),
    watchCloseTopic(),
    watchCreateTopic(),
    watchSendMessage(),
    watchLeaderBoard(),
  ]);
}
