import React, { useState, useEffect } from "react";
import Texts from "./Texts";
import moment from "moment";

import "./CardPostit.css";
import CheckBoxList from "./CheckBoxList";

const CardPostit = ({
  info,
  deletePost,
  editPost,
  textInputSearch,
  setInfoUndo,
  setShowUndo,
  viewDeletdPost,
  fetchPostIts,
}) => {
  const [invalidDate, setInvalidDate] = useState(false);
  const [searchMatch, setSearchMatch] = useState(true);
  const [checkText, setcheckText] = useState("Adicionar...");

  const exchangeText = () => {
    setcheckText("");
  };

  const addNewRow = (text) => {
    if (text.length > 0) {
      const dados = info;
      dados.checkList.push({ check: false, text: text });

      editPost(dados);

      setcheckText("Adicionar...");
    } else {
      setcheckText("Adicionar...");
    }
  };

  //codigos de busca
  useEffect(() => {
    let textToSearch = [];
    textToSearch.push(info.date);
    textToSearch.push(info.message);
    textToSearch.push(info.title);
    info.checkList.forEach((dado) => {
      textToSearch.push(dado.text);
    });

    const texts = textToSearch.join(" ");
    let match = new RegExp(textInputSearch, "i");

    if (match.test(texts)) {
      setSearchMatch(true);
    } else {
      setSearchMatch(false);
    }
  }, [textInputSearch, info]);

  const validateDate = (date) => {
    if (date.length < 1) {
      setInvalidDate(false);
      info.date = "";
      editPost(info);
      return;
    }

    if (moment(date, "DD-MM-YYYY").isValid() && /\d\d-\d\d-\d{4}/.test(date)) {
      info.date = date;
      setInvalidDate(false);
      editPost(info);
    } else {
      setInvalidDate(true);
    }
  };

  return (
    <div
      className="card"
      style={{
        display: searchMatch ? "" : "none",
        border: info.share ? "2px solid var(--colorFontPrimary)" : "",
      }}
    >
      <Texts
        data={info}
        deletePost={deletePost}
        editPost={editPost}
        dataEdit={info}
        setSearchMatch={setSearchMatch}
        setInfoUndo={setInfoUndo}
        setShowUndo={setShowUndo}
        viewDeletdPost={viewDeletdPost}
        fetchPostIts={fetchPostIts}
      />
      <CheckBoxList data={info} editPost={editPost} />
      <p
        contentEditable
        suppressContentEditableWarning={true}
        className="OneMoreCheck"
        onFocus={exchangeText}
        onBlur={(e) => addNewRow(e.target.textContent)}
      >
        {checkText}
      </p>
      <p
        className="date"
        contentEditable
        suppressContentEditableWarning={true}
        style={{ color: invalidDate ? "var(--colorFontPrimary)" : "" }}
        onBlur={(e) => {
          validateDate(e.target.textContent);
        }}
      >
        {info.date}
      </p>{" "}
      {info.trash && (
        <button
          className="cardPostitButtonRestore"
          onClick={() => {
            info.trash = false;
            editPost(info);
          }}
        >
          Restaurar
        </button>
      )}
      {invalidDate && (
        <p className="validDate">Data inválida, formato aceito (DD-MM-AAAA)</p>
      )}
      {info.editDate && <p className="editDate">{info.editDate}</p>}
      {info.share && (
        <p className="homeShare">
          Compartihado com <span className="homeShareSpan">{info.share}</span>
        </p>
      )}
    </div>
  );
};

export default CardPostit;
