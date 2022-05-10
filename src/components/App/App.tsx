import React, { useEffect, useState } from 'react';
import {
  Switch,
  Route,
  Link,
  // Redirect,
} from 'react-router-dom';

import {
  FORUM_ROUTE,
  GAME_OVER_ROUTE,
  GAME_PLAY_ROUTE,
  GAME_START_ROUTE,
  HOME_ROUTE,
  LEADERBOARD_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  REGISTER_ROUTE,
  EDIT_PASSWORD_ROUTE,
} from 'constants/routes';
import { Home } from 'pages/Home';
import { Login } from 'pages/Login';
import { Register } from 'pages/Register';
import { Profile } from 'pages/Profile';
import { LeaderBoard } from 'pages/LeaderBoard';
import { Forum } from 'pages/Forum';
import { GameStart } from 'pages/GameStart';
import { GamePlay } from 'pages/GamePlay';
import { GameOver } from 'pages/GameOver';
import { UserController } from 'controllers/UserController';
import { NOTIFICATION_LEVEL, sendNotification } from 'modules/notification';
import _constant from 'lodash/constant';
import { EditPassword } from 'pages/EditPassword';
import { useAppSelector } from '../../hooks/useAppSelector';
import { authRoutes, unAuthRoutes, useAuth } from '../../hooks/useAuth';


/*
* TODO навигация нужна только на этапе разработки, потом от нее можно будет избавиться, т.к. во всех интерфейсах
*   будут линки на требуемые страницы
* */
const defaultIsVisible = _constant(true);
const isVisibleForAuthenticatedUser = (isUserAuthenticated: boolean) => isUserAuthenticated;
const isVisibleForNotAuthenticatedUser = (isUserAuthenticated: boolean) => !isUserAuthenticated;

const NAVIGATION_SCHEMA = [
  {
    title: 'Лендинг',
    route: HOME_ROUTE,
    isVisible: defaultIsVisible,
    icon: null,
  },
  {
    title: 'Вход',
    route: LOGIN_ROUTE,
    isVisible: isVisibleForNotAuthenticatedUser,
    icon: null,
  },
  {
    title: 'Регистрация',
    route: REGISTER_ROUTE,
    isVisible: isVisibleForNotAuthenticatedUser,
    icon: null,
  },
  {
    title: 'Профиль',
    route: PROFILE_ROUTE,
    isVisible: isVisibleForAuthenticatedUser,
    icon: null,
  },
  {
    title: 'Форум',
    route: FORUM_ROUTE,
    isVisible: isVisibleForAuthenticatedUser,
    icon: null,
  },
  {
    title: 'Таблица рекордов',
    route: LEADERBOARD_ROUTE,
    isVisible: isVisibleForAuthenticatedUser,
    icon: null,
  },
  {
    title: 'Запуск игры',
    route: GAME_START_ROUTE,
    isVisible: isVisibleForAuthenticatedUser,
    icon: null,
  },
  {
    title: 'Игра',
    route: GAME_PLAY_ROUTE,
    isVisible: isVisibleForAuthenticatedUser,
    icon: null,
  },
  {
    title: 'Конец игры',
    route: GAME_OVER_ROUTE,
    isVisible: isVisibleForAuthenticatedUser,
    icon: null,
  },
  {
    title: 'Смена пароля',
    route: EDIT_PASSWORD_ROUTE,
    isVisible: isVisibleForAuthenticatedUser,
    icon: null,
  },
];

export const App = () => {

  useAuth(authRoutes, unAuthRoutes);

  const [isUserDataRequestInProgress, setIsUserDataRequestInProgress] = useState(true);
  const { id } = useAppSelector(state => state.profileReducer);
  useEffect(
    () => {
      UserController
        .fetchAndSetSignedUserData()
        .catch(() => {
          sendNotification('Пользователь не авторизован в системе', NOTIFICATION_LEVEL.ERROR);
        })
        .finally(() => setIsUserDataRequestInProgress(false));
    },
    [],

  );

  if (isUserDataRequestInProgress) {
    return null;
  }

  return (
    <div className="app">
      <div className="app__navigation">
        {
          NAVIGATION_SCHEMA
            .filter(({ isVisible }) => isVisible(!!id))
            .map(({ title, route }) => (
              <Link key={route} to={route}>
                {title}{' '}
              </Link>
            ))
        }
      </div>
      {
        id ?
          (
            <div className="app__content">
              <Switch>
                <Route path={HOME_ROUTE} component={Home} />
                <Route path={LOGIN_ROUTE} component={Login} />
                <Route path={REGISTER_ROUTE} component={Register} />
                <Route path={PROFILE_ROUTE} exact component={Profile} />
                <Route path={LEADERBOARD_ROUTE} component={LeaderBoard} />
                <Route path={FORUM_ROUTE} component={Forum} />
                <Route path={GAME_START_ROUTE} exact component={GameStart} />
                <Route path={GAME_PLAY_ROUTE} exact component={GamePlay} />
                <Route path={GAME_OVER_ROUTE} exact component={GameOver} />
                <Route path={EDIT_PASSWORD_ROUTE} exact component={EditPassword} />

                {/* <Redirect to={HOME_ROUTE} /> */}
              </Switch>
            </div>
          ) :
          (
            <Switch>
              <Route path={LOGIN_ROUTE} component={Login} />
              <Route path={REGISTER_ROUTE} component={Register} />
              <Route path={HOME_ROUTE} component={Home} />
              {/* <Redirect to={LOGIN_ROUTE} /> */}
            </Switch>
          )
      }
    </div>
  );
};
