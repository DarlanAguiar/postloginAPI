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

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (password === passwordConfirm) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        setErrorMessage(error);
      }
    } else {
      setErrorMessage({ message: "Senhas não conferem" });
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

        <ErrorsLogin error={errorMessage} />

        <button className="Cadastrar" type="submit">
          Cadastrar
        </button>
      </form>

      <button
        className="buttonState"
        onClick={() => {
          setIsRegistering(!isRegistering);
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
