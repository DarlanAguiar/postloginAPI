import React, { useState, useContext } from "react";
/* import { FcGoogle } from "react-icons/fc";

import { useNavigate } from "react-router-dom";

import { firebaseApp } from "../database/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

import { AuthContexts } from "../contexts/contexts"; */

import "./Login.css";

import InputLogin from "./login/InputLogin";
import CreateAccount from "./login/CreateAccount";

/* 
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
 */
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

  /*  const { setAuthenticated, setUserEmail } = useContext(AuthContexts);

  const navigate = useNavigate();

  const [isRegistering, setIsRegistering] = useState(null);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      console.log(usuarioFirebase);
      //caso tenha uma seção iniciada
      setUserEmail(usuarioFirebase.email);
      setAuthenticated(true);

      navigate("/");
    } else {
      //caso que nao tenha um seção iniciada
      setUserEmail(null);

      console.log("não tem usuario global");
    }
  });

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

    if (isRegistering) {
      //se estou criando
      if (password === passwordConfirm) {
        try {
          const user = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
        } catch (error) {
          showErrorMessage(error);
        }
      } else {
        showErrorMessage({ message: "Senhas não conferem" });
      }
    } else {
      //se não estou criando conta
      try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        console.log("***entrando" + email);
      } catch (error) {
        showErrorMessage(error);
      }
    }
  };

  const handleLoginGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider).then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // informaçoes do usuario.
        const token = credential.accessToken;
        const user = result.user;
      });
    } catch (error) {
      showErrorMessage(error);
    }
  }; */

  return (
    <div>
      {/*  <div className="divText">
        <h1 style={{ color: isRegistering ? "yellow" : "chartreuse" }}>
          {isRegistering ? "Cadastrar" : "Já possui cadastro? "}
        </h1>
        <p>
          {isRegistering
            ? "Complete os campos para fazer cadastro"
            : "Faça o login "}
        </p>
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
        {isRegistering && (
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
        )}

        {hasError && (
          <p
            className="errorText"
            style={{ color: isRegistering ? "yellow" : "chartreuse" }}
          >
            {errorMessage}
          </p>
        )}

        <button
          className="logarCadastrar"
          type="submit"
          style={{ background: isRegistering ? "yellow" : "chartreuse" }}
        >
          {isRegistering ? "Cadastrar" : "Entrar"}
        </button>
      </form>

      {!isRegistering && (
        <button
          className="googleButton"
          onClick={() => handleLoginGoogle()}
          type="submit"
        >
          Entrar com Google <FcGoogle />
        </button>
      )}
      <button
        className="buttonState"
        onClick={() => {
          setIsRegistering(!isRegistering);
          setHasError(false);
        }}
      >
        {isRegistering
          ? "Já tem conta? Iniciar seção"
          : "Não tem conta? Cadastrar"}
      </button>
      <button
        onClick={() => {
          setAuthenticated(true);
          navigate("/");
        }}
        className="buttonNoRegister"
      >
        Usar o APP sem cadastro
      </button> */}

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
