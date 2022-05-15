import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  EDIT_PASSWORD_ROUTE,
  FORUM_ROUTE,
  GAME_OVER_ROUTE,
  GAME_PLAY_ROUTE,
  GAME_START_ROUTE,
  HOME_ROUTE,
  LEADERBOARD_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  REGISTER_ROUTE,
  ROOT_ROUTE,
} from "../constants/routes";
import { useAppSelector } from "./useAppSelector";

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
  // ROOT_ROUTE,
];
export const unAuthRoutes: TUnAuthRoutes = [
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  ROOT_ROUTE,
];
export const useAuth = (
  authRoutesArr: TAuthRoutes = authRoutes,
  unAuthRoutesArr: TUnAuthRoutes = unAuthRoutes
) => {
  const { id } = useAppSelector((state) => state.profileReducer);
  const { isFetch } = useAppSelector((state) => state.fetchReducer);
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    const authPath = authRoutesArr.includes(location.pathname);
    const unAuthPath = unAuthRoutesArr.includes(location.pathname);
    console.log("useAuth");
    if (isFetch) {
      console.log("isFetch");

      return;
    }
    if (id && unAuthPath) {
      history.push(HOME_ROUTE);
    }
    if (!id && authPath) {
      history.push(LOGIN_ROUTE);
    }
    // if (!authPath) {
    //   return;
    // }

    // if (!id) {
    //   console.log("id");

    //   history.push(LOGIN_ROUTE);
    // }
  }, [id, location.pathname, history]);
};
