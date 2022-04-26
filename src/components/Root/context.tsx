import React, {useState} from "react";


export const UserContext = React.createContext({
  userData: null,
  setUserData: (value: unknown) => value,
});

export const UserContextProvider = (props: { children: React.ReactNode }) => {

  const [userData, setUserData] = useState(null);

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <UserContext.Provider value={{ userData, setUserData }}>
      {props.children}
    </UserContext.Provider>
  )
};
