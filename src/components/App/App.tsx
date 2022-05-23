import React from 'react';
import {
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import routes from '../../routes';
/*
* TODO навигация нужна только на этапе разработки, потом от нее можно будет избавиться, т.к. во всех интерфейсах
*   будут линки на требуемые страницы
* */
import { NAVIGATION_SCHEMA } from './constants';
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
} from 'constants/routes';
//import { UserController } from 'controllers/UserController';
import { useAppSelector } from 'hooks/useAppSelector';
import { useAuth } from 'hooks/useAuth';

export const App = () => {

  useAuth();

  const { id } = useAppSelector(state => state.profileReducer);
  // useEffect(
  //   () => {
  //     UserController
  //       .fetchAndSetSignedUserData();
  //   },
  //   [],
  // );


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
                {
                  routes.filter((route) => route.needAuth).map(({ ...routeProps }) => (
                    <Route 
                      key={routeProps.path}
                     {...routeProps} 
                    />
                  ))
                }
                <Redirect to={HOME_ROUTE} />
              </Switch>
            </div>
          ) :
          (
            <Switch>
                {
                  routes.filter((route) => !route.needAuth).map(({ ...routeProps }) => (
                    <Route 
                      key={routeProps.path}
                     {...routeProps} 
                    />
                  ))
                }
              <Redirect to={LOGIN_ROUTE} />
            </Switch>
          )
      }
    </div>
  );
};
