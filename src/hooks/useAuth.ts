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

export const useAuth = (
  authRoutes: TAuthRoutes,
  unAuthRoutes: TUnAuthRoutes
) => {
  const { id } = useAppSelector((state) => state.profileReducer);
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    const authPath = authRoutes.includes(location.pathname);
    const unAuthPath = unAuthRoutes.includes(location.pathname);
    if (id && unAuthPath) {
      history.push(HOME_ROUTE);
    }
    if (!id && authPath) {
      history.push(LOGIN_ROUTE);
    }
  }, [id, location.pathname]);
};

export const unAuthRoutes = [
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  ROOT_ROUTE,
];
export const authRoutes = [
  PROFILE_ROUTE,
  FORUM_ROUTE,
  LEADERBOARD_ROUTE,
  GAME_START_ROUTE,
  GAME_PLAY_ROUTE,
  GAME_OVER_ROUTE,
  EDIT_PASSWORD_ROUTE,
  ROOT_ROUTE,
];
