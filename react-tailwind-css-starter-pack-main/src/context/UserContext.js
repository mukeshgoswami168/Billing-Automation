import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);
export const UserContextAPI = ({ children }) => {
  const [User, setUser] = useState({});
  const [Data, setData] = useState([]);
  return (
    <UserContext.Provider value={{ User, setUser, Data, setData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextAPI;
