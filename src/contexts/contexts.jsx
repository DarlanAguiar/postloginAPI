import React, { createContext, useState } from "react";

export const AuthContexts = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const [userEmail, setUserEmail] = useState(null);

  const [showInfoIndexED, setshowInfoIndexED] = useState(false);

  const [token, setToken] = useState("");

  return (
    <AuthContexts.Provider
      value={{
        authenticated,
        setAuthenticated,
        userEmail,
        setUserEmail,
        showInfoIndexED,
        setshowInfoIndexED,
        setToken,
        token,
      }}
    >
      {children}
    </AuthContexts.Provider>
  );
};

export default AuthProvider;
