import React, { useState } from "react";

import "./Login.css";

import InputLogin from "./login/InputLogin";
import CreateAccount from "./login/CreateAccount";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const showErrorMessage = (error) => {
    setHasError(true);

    switch (error.message) {
      case "Firebase: Error (auth/internal-error).":
        return setErrorMessage("Dados incompleto");
      case "Firebase: Error (auth/missing-email).":
        return setErrorMessage("Adicione o Email");
      case "Firebase: Error (auth/invalid-email).":
        return setErrorMessage("Email inválido");
      case "Firebase: Password should be at least 6 characters (auth/weak-password).":
        return setErrorMessage("A senha deve conter no mínimo 6 caracteres");
      case "Firebase: Error (auth/email-already-in-use).":
        return setErrorMessage("Email utilizado por outro usuáro");
      case "Firebase: Error (auth/wrong-password).":
        return setErrorMessage("Senha inválida");
      case "Firebase: Error (auth/user-not-found).":
        return setErrorMessage("Usuário não existe");
      case "Senhas não conferem":
        return setErrorMessage("Senhas não conferem");
      default:
        return setErrorMessage(
          "cadastro não efetivado, confira os dados e tente novamente"
        );
    }
  };

  return (
    <div>
      {!isRegistering ? (
        <InputLogin
          setIsRegistering={setIsRegistering}
          isRegistering={isRegistering}
          hasError={hasError}
          setHasError={setHasError}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          showErrorMessage={showErrorMessage}
        />
      ) : (
        <CreateAccount
          setIsRegistering={setIsRegistering}
          isRegistering={isRegistering}
          hasError={hasError}
          setHasError={setHasError}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          showErrorMessage={showErrorMessage}
        />
      )}
    </div>
  );
};

export default Login;
