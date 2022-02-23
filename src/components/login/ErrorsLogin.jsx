import React from "react";

import "./ErrorLogin.css";

const ErrorsLogin = ({ error }) => {
  console.log("Erro foi chamado:", error);
  let errorMessage = null;
  switch (error?.message) {
    case null:
    case undefined:
      break;
    case "Firebase: Error (auth/internal-error).":
      errorMessage = "Dados incompleto";
      break;
    case "Firebase: Error (auth/missing-email).":
      errorMessage = "Adicione o Email";
      break;
    case "Firebase: Error (auth/invalid-email).":
      errorMessage = "Email inválido";
      break;
    case "Firebase: Password should be at least 6 characters (auth/weak-password).":
      errorMessage = "A senha deve conter no mínimo 6 caracteres";
      break;
    case "Firebase: Error (auth/email-already-in-use).":
      errorMessage = "Email utilizado por outro usuáro";
      break;
    case "Firebase: Error (auth/wrong-password).":
      errorMessage = "Senha inválida";
      break;
    case "Firebase: Error (auth/user-not-found).":
      errorMessage = "Usuário não existe";
      break;
    case "Senhas não conferem":
      errorMessage = "Senhas não conferem";
      break;
    default:
      errorMessage =
        "cadastro não efetivado, confira os dados e tente novamente";
  }

  return errorMessage ? (
    <p className="errorTextCreateAccount">{errorMessage}</p>
  ) : (
    <></>
  );
};

export default ErrorsLogin;
