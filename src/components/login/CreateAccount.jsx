import React, { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import { firebaseApp } from "../../database/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { AuthContexts } from "../../contexts/contexts";

import "./CreateAccount.css";
import ErrorsLogin from "./ErrorsLogin";

const auth = getAuth(firebaseApp);

const CreateAccount = ({ setIsRegistering, isRegistering }) => {
  const { setAuthenticated, setshowInfoIndexED } = useContext(AuthContexts);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasError(false);
    setErrorMessage("");

    if (password === passwordConfirm) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        showErrorMessage(error);
      }
    } else {
      showErrorMessage({ message: "Senhas não conferem" });
    }
  };

  return (
    <div className="containerAccount">
      <div className="divText">
        <h1>Cadastrar</h1>
        <p>Complete os campos para fazer cadastro</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="divInput">
          <label htmlFor="email">Seu email</label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            type="text"
            placeholder="Email"
          />
        </div>

        <div className="divInput">
          <label>Senha</label>
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            type="password"
            placeholder="Senha"
          />
        </div>

        <div className="divInput">
          <label>Confirme a senha</label>
          <input
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
            value={passwordConfirm}
            type="password"
            placeholder="Senha"
          />
        </div>

       
        {hasError && <ErrorsLogin errorMessage={errorMessage} />}

        <button className="Cadastrar" type="submit">
          Cadastrar
        </button>
      </form>

      <button
        className="buttonState"
        onClick={() => {
          setIsRegistering(!isRegistering);
          setHasError(false);
        }}
      >
        Já tem conta? Iniciar seção
      </button>

      <button
        onClick={() => {
          setAuthenticated(true);
          setshowInfoIndexED(true);
          navigate("/");
        }}
        className="buttonNoRegister"
      >
        Usar o APP OFFLINE (Sem cadastro)
      </button>
    </div>
  );
};

export default CreateAccount;
