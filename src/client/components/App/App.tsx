import React, { useEffect, useMemo } from 'react';
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



export const App = () => {
  useAuth();

  const { id } = useAppSelector(state => state.profileReducer);
  const location = useLocation();
  useEffect(() => {

    if (id) {
      return;
    }
    const params = new URLSearchParams(location.search);
    const code = params.get('code');

    if (code) {
      UserController.signInYaOAuth({ code, redirect_uri: localUrl });
    } else {
      UserController.fetchAndSetSignedUserData();
    }
  }, [id, location.search]);

  const isProduction = useMemo(
    () => process.env.NODE_ENV === 'production', [],
  );
  
  return (
    <div className="app">
      {
        isProduction ? null :
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
      }

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
