import { all } from "redux-saga/effects";
import {
  watchSignIn,
  watchRegister,
  watchLogout,
} from "./reducers/authReducer/sagaAuth";
import { watchOnFetch } from "./reducers/fetchReducer/sagaFetch";
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
  ]);
  // const sagas = [watchAuth];

  // const retrySagas = sagas.map((saga) => {
  //   return spawn(function* () {
  //     while (true) {
  //       try {
  //         yield call(saga);
  //         break;
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   });
  // });
  // yield all(retrySagas);
}
