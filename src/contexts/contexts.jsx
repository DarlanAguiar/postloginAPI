import React, { createContext, useState } from "react";



export const AuthContexts = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const [userEmail, setUserEmail] = useState(null);

  return (
    <AuthContexts.Provider
      value={{ authenticated, setAuthenticated, userEmail, setUserEmail }}
    >
      {children}
    </AuthContexts.Provider>
  );
};

export default AuthProvider;
