import React, { useEffect, Suspense, lazy } from 'react';
import {
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
} from 'react-router-dom';
import { Spinner, Box } from '@chakra-ui/react';
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
  ROOT_ROUTE,
} from 'constants/routes';

const Home = lazy(() => import('pages/Home'));
const Login = lazy(() => import('pages/Login'));
const Register = lazy(() => import('pages/Register'));
const Profile = lazy(() => import('pages/Profile'));
const LeaderBoard = lazy(() => import('pages/LeaderBoard'));
const Forum = lazy(() => import('pages/Forum'));
const GameStart = lazy(() => import('pages/GameStart'));
const GamePlay = lazy(() => import('pages/GamePlay'));
const GameOver = lazy(() => import('pages/GameOver'));
const EditPassword = lazy(() => import('pages/EditPassword'));
const OauthYa = lazy(() => import('pages/authYa'));
import { UserController } from 'controllers/UserController';
import _constant from 'lodash/constant';
import { useAppSelector } from 'hooks/useAppSelector';
import { useAuth } from 'hooks/useAuth';


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
const _renderSpinner = ()=> {
  return (
    <Box w='100vw' h='100vh' display="flex" alignItems="center" justifyContent="center">
      <Spinner color='red.500' />
    </Box>
  );
};

export const App = () => {

  useAuth();

  const { id } = useAppSelector(state => state.profileReducer);
  const location = useLocation();

  useEffect(
    () => {
      if (location.pathname !== ROOT_ROUTE) {      
        UserController
        .fetchAndSetSignedUserData();
      }

    },
    [],
  );


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
      <Suspense fallback={_renderSpinner()}>
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
                <Route path={ROOT_ROUTE} component={Home} />
                <Redirect to={HOME_ROUTE} />
              </Switch>
            </div>
          ) :
          (
            <Switch>
              <Route path={LOGIN_ROUTE} component={Login} />
              <Route path={REGISTER_ROUTE} component={Register} />
              <Route path={GAME_START_ROUTE} exact component={GameStart} />
              <Route path={GAME_PLAY_ROUTE} exact component={GamePlay} />
              <Route path={GAME_OVER_ROUTE} exact component={GameOver} />
              <Route path={HOME_ROUTE} component={Home} />
              <Route path={ROOT_ROUTE} component={OauthYa} />
              <Redirect to={LOGIN_ROUTE} />
            </Switch>
          )
      }
      </Suspense>
    </div>
  );
};
