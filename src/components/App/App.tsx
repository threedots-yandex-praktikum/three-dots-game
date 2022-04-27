import React, {useContext, useEffect, useState} from 'react';
import {
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

import "./style.scss";
import { Home } from "../../pages/Home/Home";
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
} from "../../constants/routes";
import { Login } from "../../pages/Login/Login";
import {Register} from "../../pages/Register/Register";
import {Profile} from "../../pages/Profile/Profile";
import {LeaderBoard} from "../../pages/LeaderBoard/LeaderBoard";
import {Forum} from "../../pages/Forum/Forum";
import {GameStart} from "../../pages/GameStart/GameStart";
import {GamePlay} from "../../pages/GamePlay/GamePlay";
import {GameOver} from "../../pages/GameOver/GameOver";
import { EditPassword } from "../../pages/EditPassword";
import {UserController} from "../../controllers/UserController";
import {NOTIFICATION_LEVEL, sendNotification} from "../../modules/notification";
import {UserContext} from "components/Root/context";


/*
 * TODO навигация нужна только на этапе разработки, потом от нее можно будет избавиться, т.к. во всех интерфейсах
 *   будут линки на требуемые страницы
 * */
const defaultIsVisible = (isUserAuthenticated: boolean) => true;
const isVisibleForAuthenticatedUser = (isUserAuthenticated: boolean) =>
  isUserAuthenticated;

const NAVIGATION_SCHEMA = [
  {
    title: "Лендинг",
    route: HOME_ROUTE,
    isVisible: defaultIsVisible,
    icon: null,
  },
  {
    title: "Вход",
    route: LOGIN_ROUTE,
    isVisible: defaultIsVisible,
    icon: null,
  },
  {
    title: "Регистрация",
    route: REGISTER_ROUTE,
    isVisible: defaultIsVisible,
    icon: null,
  },
  {
    title: "Профиль",
    route: PROFILE_ROUTE,
    isVisible: isVisibleForAuthenticatedUser,
    icon: null,
  },
  {
    title: "Форум",
    route: FORUM_ROUTE,
    isVisible: isVisibleForAuthenticatedUser,
    icon: null,
  },
  {
    title: "Таблица рекордов",
    route: LEADERBOARD_ROUTE,
    isVisible: isVisibleForAuthenticatedUser,
    icon: null,
  },
  {
    title: "Запуск игры",
    route: GAME_START_ROUTE,
    isVisible: isVisibleForAuthenticatedUser,
    icon: null,
  },
  {
    title: "Игра",
    route: GAME_PLAY_ROUTE,
    isVisible: isVisibleForAuthenticatedUser,
    icon: null,
  },
  {
    title: "Конец игры",
    route: GAME_OVER_ROUTE,
    isVisible: isVisibleForAuthenticatedUser,
    icon: null,
  },
  {
    title: "Смена пароля",
    route: EDIT_PASSWORD_ROUTE,
    isVisible: isVisibleForAuthenticatedUser,
    icon: null,
  },
];

export const App = () => {
  const { userData, setUserData } = useContext(UserContext);

  const [isUserDataRequestInProgress, setIsUserDataRequestInProgress] = useState(true);

    useEffect(
    () => {
      UserController
        .fetchAndSetSignedUserData()
        .then(setUserData)
        .catch(() => {
          sendNotification('Пользователь не авторизован в системе', NOTIFICATION_LEVEL.ERROR);
        })
        .finally(() => setIsUserDataRequestInProgress(false));
    },
    [setUserData],
  )

  if(isUserDataRequestInProgress) {
    return null;
  }

  return (
    <div className="app">
      {_renderNavigation(!!userData)}
      {
        userData ?
          _renderAppContent() :
          _renderNotAuthenticatedContent()
      }
    </div>
  );
};

const _renderAppContent = () => {
  return (
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

        <Redirect to={HOME_ROUTE} />
      </Switch>
    </div>
  );
};

const _renderNavigation = (isUserAuthenticated: boolean) => {
  return (
    <div className="app__navigation">
      {NAVIGATION_SCHEMA.filter(({ isVisible }) =>
        isVisible(isUserAuthenticated)
      ).map(({ title, route }) => (
        <Link key={route} to={route}>
          {title}{" "}
        </Link>
      ))}
    </div>
  );
};

const _renderNotAuthenticatedContent = () => {
  return (
    <Switch>
      <Route path={LOGIN_ROUTE} component={Login}/>
      <Route path={REGISTER_ROUTE} component={Register}/>
      <Route path={HOME_ROUTE} component={Home}/>
      <Redirect to={LOGIN_ROUTE}/>
    </Switch>
  );
};
