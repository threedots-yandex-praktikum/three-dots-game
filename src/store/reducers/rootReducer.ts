import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { fetchReducer } from "./fetchReducer";
import { leaderBoardReducer } from "./leaderBoardReducer";

const rootReducer = combineReducers({
  authReducer,
  fetchReducer,
  leaderBoardReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
