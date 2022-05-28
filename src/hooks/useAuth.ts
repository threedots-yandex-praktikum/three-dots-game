import { useHistory, useLocation } from "react-router-dom";
import {
  EDIT_PASSWORD_ROUTE,
  FORUM_ROUTE,
  GAME_OVER_ROUTE,
  GAME_PLAY_ROUTE,
  GAME_START_ROUTE,
  LEADERBOARD_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  REGISTER_ROUTE,
} from "constants/routes";
import { useAppSelector } from "./useAppSelector";
import { useEffect } from "react";

type TAuthRoutes = string[];
type TUnAuthRoutes = string[];

export const authRoutes: TAuthRoutes = [
  PROFILE_ROUTE,
  FORUM_ROUTE,
  LEADERBOARD_ROUTE,
  GAME_START_ROUTE,
  GAME_PLAY_ROUTE,
  GAME_OVER_ROUTE,
  EDIT_PASSWORD_ROUTE,
];
export const unAuthRoutes: TUnAuthRoutes = [LOGIN_ROUTE, REGISTER_ROUTE];
export const useAuth = (authRoutesArr: TAuthRoutes = authRoutes) => {
  const { id } = useAppSelector((state) => state.profileReducer);
  const { isFetch } = useAppSelector((state) => state.fetchReducer);
  const history = useHistory();
  const location = useLocation();

  sessionStorage.setItem("userId", String(id));

  const authPath = authRoutesArr.includes(location.pathname);
  useEffect(() => {
    if (sessionStorage.getItem("userId") && authRoutesArr) {
      return;
    }
    if (isFetch) {
      return;
    }

    if (!id && authPath) {
      history.push(LOGIN_ROUTE);
    }
  }, [id, authPath, history, isFetch]);
};
