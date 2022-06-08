import React, { useEffect } from 'react';
import {
  Switch,
  Route,
  Link,
  Redirect,
  useLocation,
} from 'react-router-dom';
import routes from '../../routes';
import { NAVIGATION_SCHEMA } from './constants';
import { localUrl } from 'modules/api/oAuthConfig';
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
} from 'constants/routes';
import { useAppSelector } from 'hooks/useAppSelector';
import { useAuth } from 'hooks/useAuth';

import { UserController } from 'controllers/UserController';
import _constant from 'lodash/constant';

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
            routes
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
