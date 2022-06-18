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
import { HTTPTransport } from 'client/modules/api/httpTransport/httpTransport';
import { DEFAULT_POST_REQUEST_HEADERS } from 'client/modules/api/httpTransport/constants';

/*
* TODO навигация нужна только на этапе разработки, потом от нее можно будет избавиться, т.к. во всех интерфейсах
*   будут линки на требуемые страницы
* */


/*
* TODO убрать тестовую логику запросов на backend
* */
const testBackendRequestsCallback = async () => {
  const backend = new HTTPTransport('https://local.ya-praktikum.tech:5000/api');
    /*
  * тестовый запрос на точку создания данных модели user
  * */
  await backend.post(
      'user',
    {
      data: { name: 'Олег1', theme: 'DARK' },
      headers: DEFAULT_POST_REQUEST_HEADERS,
    })
      .then(() => console.log('успешно выполнен запрос на точку user'))
      .catch(() => console.log('ошибка запроса на точку user'));


    /*
  * тестовый запрос на точку создания данных модели topic
  * */
  await backend.post(
        'forum/topic',
    {
      data: { name: 'name45', userId: 1 },
      headers: DEFAULT_POST_REQUEST_HEADERS,
    })
        .then(() => console.log('успешно выполнен запрос на точку topic'))
        .catch(() => console.log('ошибка запроса на точку topic'));


  /*
  * тестовый запрос на точку топика
  * */
  await backend
    .get('forum/topic')
    .then(() => console.log('успешно выполнен GET запрос на точку topic'))
    .catch(() => console.log('ошибка GET запроса на точку topic'));

      /*
  * тестовый запрос на точку конкретного topic
  * */
  await backend
    .get('forum/topic/3')
    .then(() => console.log('успешно выполнен запрос на точку форума c пареметром topic'))
    .catch(() => console.log('ошибка запроса на точку форума параметром topic'));

  /*
  * тестовый запрос на точку редактирования данных модели topic
  * */
  await backend
    .put('forum/topic/3', { data: { status: 1 } })
    .then(() => console.log('успешно выполнен PUT запрос на точку topic'))
    .catch(() => console.log('ошибка PUT запроса на точку topic'));


      /*
  * тестовый запрос на точку конкретного topic
  * */
  await backend
  .get('forum/topic/3')
  .then(() => console.log('успешно выполнен запрос на точку форума c пареметром topic'))
  .catch(() => console.log('ошибка запроса на точку форума параметром topic'));



   /*
  * тестовый запрос на точку создания данных модели comment
  * */
  await backend.post(
    'forum/comment',
    {
      data: { message: 'allo this is comment', topicId: 3, userId: 1 },
      headers: DEFAULT_POST_REQUEST_HEADERS,
    })
    .then(() => console.log('успешно выполнен запрос на точку comment'))
    .catch(() => console.log('ошибка запроса на точку comment'));

  /*
  * тестовый запрос на точку получения данных модели comment
  * */
  await backend
    .get('forum/comment')
    .then(() => console.log('успешно выполнен запрос на точку comment'))
    .catch(() => console.log('ошибка запроса на точку comment'));



  /*
  * тестовый запрос на точку получения данных модели comment
  * */
  await backend
    .get('forum/comment/1')
    .then(() => console.log('успешно выполнен GET запрос на точку comment'))
    .catch(() => console.log('ошибка GET запроса на точку comment'));


          /*
  * тестовый запрос на точку конкретного topic
  * */

  /*
  * тестовый запрос на точку редактирования данных модели comment
  * */
  await backend
    .put('forum/comment/1', { data: { message: 'test test' } })
    .then(() => console.log('успешно выполнен PUT запрос на точку comment'))
    .catch(() => console.log('ошибка PUT запроса на точку comment'));

  /*
  * тестовый запрос на точку удаления данных модели comment
  * */
  await backend
    .delete('forum/comment/1')
    .then(() => console.log('успешно выполнен DELETE запрос на точку comment'))
    .catch(() => console.log('ошибка DELETE запроса на точку comment'));

};

const testBackendRequestsCallback2 = async () => {
  const backend = new HTTPTransport('https://local.ya-praktikum.tech:5000/api');


  /*
  * тестовый запрос на точку топика
  * */
  await backend
    .get('forum/topic')
    .then(() => console.log('успешно выполнен GET запрос на точку topic'))
    .catch(() => console.log('ошибка GET запроса на точку topic'));


   /*
  * тестовый запрос на точку создания данных модели comment
  * */
  await backend.post(
    'forum/comment',
    {
      data: { message: 'allo this is comment', topicId: 11, userId: 1 },
      headers: DEFAULT_POST_REQUEST_HEADERS,
    })
    .then(() => console.log('успешно выполнен запрос на точку comment'))
    .catch(() => console.log('ошибка запроса на точку comment'));



        /*
    * тестовый запрос на точку удаления данных модели topic
    * */
  await backend
    .delete('forum/topic/11')
    .then(() => console.log('успешно выполнен DELETE запрос на точку topic'))
    .catch(() => console.log('ошибка DELETE запроса на точку topic'));

  await backend
    .get('forum/comment')
    .then(() => console.log('успешно выполнен запрос на точку форума c пареметром topic'))
    .catch(() => console.log('ошибка запроса на точку форума параметром topic'));
};

const testBackendRequestsCallback3 = async () => {
  const backend = new HTTPTransport('https://local.ya-praktikum.tech:5000/api');

  await backend
    .get('forum/comment?topicId=1')
    .then(() => console.log('успешно выполнен GET запрос на точку comment'))
    .catch(() => console.log('ошибка GET запроса на точку topic'));
};

export const App = () => {
  useAuth();

  const { id } = useAppSelector(state => state.profileReducer);
  const location = useLocation();
  useEffect(() => {
    //testBackendRequestsCallback();
    testBackendRequestsCallback3();

    if(id) {
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
