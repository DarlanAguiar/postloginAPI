import React, { useState, useContext } from "react";
import { FcGoogle } from "react-icons/fc";

import { useNavigate } from "react-router-dom";

import { firebaseApp } from "../../database/firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { AuthContexts } from "../../contexts/contexts";

import "./InputLogin.css";
import ErrorsLogin from "./ErrorsLogin";

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();

const InputLogin = ({ setIsRegistering, isRegistering }) => {
  const { setAuthenticated, setUserEmail, setshowInfoIndexED } =
    useContext(AuthContexts);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      const userEmail = user.user.email;
      setUserEmail(userEmail);
      setAuthenticated(true);

      navigate("/");
    } catch (error) {
      console.log("Erro do catch:", JSON.stringify(error));
      setErrorMessage(error);
    }
  };

  const handleLoginGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider).then((result) => {
        GoogleAuthProvider.credentialFromResult(result);
        // informaçoes do usuario.
        //const token = credential.accessToken;
        //console.log(credential)
        const userEmail = result.user.email;
        setUserEmail(userEmail);
        setAuthenticated(true);

        navigate("/");
      });
    } catch (error) {
      console.log(error);
      setErrorMessage(error);
    }
  };

  return (
    <div className="containerLogin">
      <div className="divText">
        <h1 className="title">Já possui cadastro?</h1>
        <p>Faça o login</p>
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

        <ErrorsLogin error={errorMessage} />

        <button className="logar" type="submit">
          Entrar
        </button>
      </form>
      <button
        className="googleButton"
        onClick={() => handleLoginGoogle()}
        type="submit"
      >
        Entrar com Google <FcGoogle />
      </button>

      <button
        className="buttonState"
        onClick={() => {
          setIsRegistering(!isRegistering);
        }}
      >
        Não tem conta? Cadastrar
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

export default InputLogin;
