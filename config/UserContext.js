import React, { createContext, useState } from "react";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <UserContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

const withUser = (Child) => (props) =>
  (
    <UserContext.Consumer>
      {(context) => <Child {...props} {...context} />}
      {/* Another option is:  {context => <Child {...props} context={context}/>}*/}
    </UserContext.Consumer>
  );

export { UserContext, UserProvider, withUser };
