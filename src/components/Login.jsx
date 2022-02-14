import React, { useState } from "react";

import "./Login.css";

import InputLogin from "./login/InputLogin";
import CreateAccount from "./login/CreateAccount";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div>
      {!isRegistering ? (
        <InputLogin
          setIsRegistering={setIsRegistering}
          isRegistering={isRegistering}
        />
      ) : (
        <CreateAccount
          setIsRegistering={setIsRegistering}
          isRegistering={isRegistering}
        />
      )}
    </div>
  );
};

export default Login;
