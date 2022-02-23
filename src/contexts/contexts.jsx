import React, { createContext, useState } from "react";

export const AuthContexts = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const [userEmail, setUserEmail] = useState(null);

  const [showInfoIndexED, setshowInfoIndexED] = useState(false);

  const [token, setToken] = useState("");

  const [theme, setTheme] = useState("dark");

  const [organization, setOrganization] = useState("");

  const [idConfiguration, setIdConfiguration] = useState("");

  



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
        theme,
        setTheme,
        organization,
        setOrganization,
        idConfiguration,
        setIdConfiguration
      }}
    >
      {children}
    </AuthContexts.Provider>
  );
};

export default AuthProvider;
