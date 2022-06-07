import React from 'react';
import {
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import routes from '../../routes';
import { NAVIGATION_SCHEMA } from './constants';
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
} from 'constants/routes';
import { useAppSelector } from 'hooks/useAppSelector';
import { useAuth } from 'hooks/useAuth';

export const App = () => {

  useAuth();

  const { id } = useAppSelector(state => state.profileReducer);

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
