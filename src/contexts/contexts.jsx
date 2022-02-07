import React, { createContext, useState, useEffect } from "react";



export const AuthContexts = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    console.log(authenticated)
    console.log(userEmail)
  }, [authenticated]);

  return (
    <AuthContexts.Provider
      value={{ authenticated, setAuthenticated, userEmail, setUserEmail }}
    >
      {children}
    </AuthContexts.Provider>
  );
};

export default AuthProvider;
