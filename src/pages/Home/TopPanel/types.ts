import { TRouteChangeCallback } from 'pages/Home/types';

export type TTopPanelProps = {
  isUserAuthenticated: boolean, 
  goToProfilePage: TRouteChangeCallback, 
  goToRegisterPage: TRouteChangeCallback, 
  goToLoginPage: TRouteChangeCallback,
}
