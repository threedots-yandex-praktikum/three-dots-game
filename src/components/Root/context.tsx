import React, { useState } from 'react';

export type TUserData = {
  id: string,
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
  setUserData: (value: unknown) => unknown,
}

export const UserContext = React.createContext({
  userData: null,
  setUserData: (value: unknown) => value,
} as TUserContext);

export const UserContextProvider = (props: { children: React.ReactNode }) => {

  const [userData, setUserData] = useState(null);

  return (
    <UserContext.Provider value={{ userData, setUserData } as TUserContext}>
      {props.children}
    </UserContext.Provider>
  );
};
