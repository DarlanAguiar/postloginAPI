import React from "react";

import { FaTools, FaRegWindowClose } from "react-icons/fa";

import "./ShowError.css";

const ShowError = ({ handleLogout }) => {
  return (
    <div className="containerWindowError">
      <div className="containerError">
        <p className="closeError" onClick={() => handleLogout()}>
          <FaRegWindowClose style={{ fontSize: "22px" }} />
        </p>
        <h1 className="titleError">ERRO</h1>
        <h2>Problemas no servidor</h2>
        <FaTools style={{ fontSize: "50px", color: "chartreuse" }} />
        <p className="textWork">
          Estamos trabalhando para voltar o mais breve possível
        </p>
        <p>Tente Novamente em instantes ou</p>
        <h3 className="appOff" onClick={() => handleLogout()}>
          Use o app no modo OFFLINE
        </h3>
      </div>
    </div>
  );
};

export default ShowError;
