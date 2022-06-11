import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
} from 'react-router-dom';
import {
  NAVIGATION_SCHEMA,
  APP_ROUTES_SCHEMA,
} from './constants';
import { localUrl } from 'client/modules/api/oAuthConfig';
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
} from 'client/constants/routes';
import { useAppSelector } from 'client/hooks/useAppSelector';
import { useAuth } from 'client/hooks/useAuth';

import { UserController } from 'client/controllers/UserController';
import {HTTPTransport} from "client/modules/api/httpTransport/httpTransport";

/*
* TODO навигация нужна только на этапе разработки, потом от нее можно будет избавиться, т.к. во всех интерфейсах
*   будут линки на требуемые страницы
* */


export const App = () => {
  useAuth();

  const { id } = useAppSelector(state => state.profileReducer);
  const location = useLocation();
  useEffect(() => {
    if(id) {

      /*
      * TODO убрать тестовую логику запросов на backend
      * */
      const backend = new HTTPTransport('https://local.ya-praktikum.tech:5000/api');

      /*
      * тестовый запрос на точку форума
      * */
      backend
        .get('forum')
        .then(() => console.log('успешно выполнен запрос на точку форума'))
        .catch(() => console.log('ошибка запроса на точку форума'))

      /*
      * тестовый запрос на точку конкретного топика
      * */
      backend
        .get('forum/2')
        .then(() => console.log('успешно выполнен запрос на точку форума c пареметром топика'))
        .catch(() => console.log('ошибка запроса на точку форума параметром топика'))

      /*
      * тестовый запрос на точку темизации
      * */
      backend
        .get('theme')
        .then(() => console.log('успешно выполнен запрос на точку темизации'))
        .catch(() => console.log('ошибка запроса на точку темизации'))


      return;
    }
    const params = new URLSearchParams(location.search);
    const code = params.get('code');

    if (code) {
      UserController
        .signInYaOAuth({ code, redirect_uri: localUrl });
    } else {
      UserController
        .fetchAndSetSignedUserData();
    }
  }, []);

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
      <div className="app__content">
        <Switch>
          {
            APP_ROUTES_SCHEMA
              .filter(({ needAuth }) => id ? true : !needAuth)
              .map(routeProps => (
                <Route
                  key={routeProps.path}
                  {...routeProps}
                />
              ))
          }
          <Redirect to={id ? HOME_ROUTE : LOGIN_ROUTE} />
        </Switch>
      </div>
    </div>
  );
};
