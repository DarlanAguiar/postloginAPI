import React, { useState, useContext } from "react";
import { addSharePost, salvarDados } from "../database/firebase";
import { salvarDadosIndexED } from "../database/database";

import { AuthContexts } from "../contexts/contexts";

import CheckItem from "./CheckItem";

import "./Header.css";

const Header = ({ show, setShow, fetchPostIts, setShowModalError }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [noText, setNoText] = useState(false);
  const [checkItem, setCheckItem] = useState("");
  const [listCheckItem, setListCheckItem] = useState([]);
  const [emailShare, setEmailShare] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const { userEmail, token } = useContext(AuthContexts);

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    setValidEmail(re.test(email));
  }

  const formatDate = (date) => {
    setDateValue(date);
    var dateFormat = date.split("-").reverse().join("-");
    setDate(dateFormat);
  };

  const checkText = () => {
    if (emailShare.length > 0 && !validEmail) {
      alert("Digite um email válido");
      return;
    }

    if (text.length > 0) {
      addDb();

      setNoText(false);
    } else {
      setNoText(true);
    }
  };

  const addListCheckItem = () => {
    if (checkItem.length > 0) {
      const newCheks = [...listCheckItem, { text: checkItem, check: false }];

      setListCheckItem(newCheks);
      setCheckItem("");
    }
  };

  const clearFilds = () => {
    setTitle("");
    setText("");
    setDate("");
    setDateValue("");
    setEmailShare("");
    setListCheckItem([]);
    setNoText(false);
  };

  const addDb = async () => {
    const data = {
      title: title,
      message: text,
      date: date,
      checkList: listCheckItem,
    };

    if (userEmail) {
      let addData;
      if (emailShare.length > 10) {
        data.share = emailShare;
        addData = await saveSharedPost(data);
      } else {
        console.log("email inválido");
        addData = await salvarDados(data, userEmail, token);
      }

      if (addData?.error) {
        setShowModalError(true);
        console.error(addData.error);
      }
    } else {
      salvarDadosIndexED(data);
    }

    clearFilds();

    setShow();

    fetchPostIts();
  };

  const saveSharedPost = async (data) => {
    await addSharePost(userEmail, data, token);
  };

  return (
    <header className="menuContainer" style={{ left: show ? 0 : "-100vw" }}>
      <div className="menuContainer--areaDigitavel">
        <textarea
          rows={1}
          placeholder="Título"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></textarea>

        <textarea
          placeholder="Seu lembrete aqui..."
          style={{ borderColor: noText ? "red" : "" }}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></textarea>
        {noText && <p className="aviso">*Este campo não pode ser vazio</p>}

        <div className="grupo-checar">
          <input
            type="text"
            placeholder="lembrete check box"
            className="checar"
            value={checkItem}
            onChange={(e) => {
              setCheckItem(e.target.value);
            }}
          />
          <button className="botao-incluir" onClick={addListCheckItem}>
            incluir
          </button>
        </div>
        {listCheckItem.map((item, key) => (
          <CheckItem item={item.text} key={key} />
        ))}
        <div className="div-data">
          <label className="label-data" htmlFor="data">
            Data:
          </label>
          <input
            className="data"
            type="date"
            value={dateValue}
            onChange={(e) => {
              formatDate(e.target.value);
            }}
          />
        </div>

        {userEmail && (
          <div className="div-share">
            <label className="label-share" htmlFor="share">
              Compartilhar post com:
            </label>
            <input
              placeholder="Digite o email para compartilhar"
              id="share"
              className="share"
              type="text"
              value={emailShare}
              onChange={(e) => {
                setEmailShare(e.target.value.toLocaleLowerCase());
                validateEmail(e.target.value);
              }}
            />
            {emailShare.length > 0 &&
              (validEmail ? (
                <p className="headerValidEmail">Email Válido</p>
              ) : (
                <p className="headerInvalidEmail">Email Inválido</p>
              ))}
          </div>
        )}

        <div className="botoes-deslizante">
          <button
            className="botao-cancelar"
            onClick={() => {
              setShow();
              clearFilds();
            }}
          >
            Cancelar
          </button>

          <button
            className="botao-salvar"
            onClick={() => {
              checkText();
            }}
          >
            Salvar
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
