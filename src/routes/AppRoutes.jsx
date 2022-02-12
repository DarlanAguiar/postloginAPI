import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { useNavigate } from "react-router-dom";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "../database/firebase";

import Home from "../Home";
import Login from "../components/Login";
import AuthProvider, { AuthContexts } from "../contexts/contexts";

const auth = getAuth(firebaseApp);

const AppRoutes = () => {
  

  const Private = ({ children }) => {
    const {
      authenticated,
      setUserEmail,
      setAuthenticated,
      //setshowInfoIndexED,
      setToken,
    } = useContext(AuthContexts);

    const navigate = useNavigate();
    

    if (!authenticated) {
      onAuthStateChanged(auth, (usuarioFirebase) => {
        if (usuarioFirebase !== null) {
          setToken(usuarioFirebase.accessToken);
          //caso tenha uma seção iniciada
          setUserEmail(usuarioFirebase.email);
          setAuthenticated(true);
          //return <Navigate to={"/"} />;
        } else {
          
          /* setAuthenticated(true);
          setshowInfoIndexED(true); */
          setUserEmail(false);
          return navigate("/login");
        }
      });

      //return <Navigate to={"/login"} />;
    }

    return children;
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            exact
            path="/login"
            element={<Login />}
          />
          <Route
            exact
            path="/"
            element={
              <Private>
                <Home />
              </Private>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
