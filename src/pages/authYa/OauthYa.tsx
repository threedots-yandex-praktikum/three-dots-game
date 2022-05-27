import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { UserController } from 'controllers/UserController';
import {
  LOGIN_ROUTE,
  HOME_ROUTE,
} from 'constants/routes';
import { localUrl } from 'modules/api/oAuthConfig';
type PropsAuth = {
  location: {
    search: URLSearchParams
  }
};

export function OauthYa(props: PropsAuth) {
  const params = new URLSearchParams(props.location.search);
  const code = params.get('code');
  
  useEffect(() => {
    
    if (code) {
      UserController
        .signInYaOAuth({ code, redirect_uri: localUrl });
    } else {
      UserController
        .fetchAndSetSignedUserData();
    }
  }, [ code]);
  if (code) {
    return <Redirect to={HOME_ROUTE}/>;
  }
  return <Redirect to={LOGIN_ROUTE}/>;
}
