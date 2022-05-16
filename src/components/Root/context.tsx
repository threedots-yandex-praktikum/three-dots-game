
export type TUserData = {
  id: number,
  login: string,
  email: string,
  phone: string,
  first_name: string,
  second_name: string,
  display_name: string,
  avatar: string,
};

export type TUserContext = {
  userData: TUserData | null,
  setUserData: (value: TUserData | null) => void,
}
