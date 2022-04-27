type TRouteChangeCallback = () => void;

export type THomeRenderProps = {
  isUserAuthenticated: boolean,
  goToLoginPage: TRouteChangeCallback,
  goToRegisterPage: TRouteChangeCallback,
  goToProfilePage: TRouteChangeCallback,
  goToGameStartPage: TRouteChangeCallback,
};
