import React, { useState, useEffect } from "react";
import Texts from "./Texts";
import moment from "moment";

import "./CardPostit.css";
import CheckBoxList from "./CheckBoxList";

const CardPostit = ({ info, deletePost, editPost, textInputSearch }) => {
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
    }else{
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
      return;
    }

    if (moment(date, "DD-MM-YYYY").isValid()  && /\d?\d-\d?\d-\d{2}?\d\d/.test(date)) {
      info.date = date;
      setInvalidDate(false);
      editPost(info);
    } else {
      setInvalidDate(true);
    }

  };

  return (
    <div className="card" style={{ display: searchMatch ? "" : "none" }}>
      <Texts
        data={info}
        deletePost={deletePost}
        editPost={editPost}
        dataEdit={info}
        setSearchMatch={setSearchMatch}
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
        style={{ color: invalidDate ? "chartreuse" : "#fff" }}
        onBlur={(e) => {
          validateDate(e.target.textContent);
        }}
      >
        {info.date}
      </p>
      {invalidDate && (
        <p className="validDate">Data inválida, formato aceito (DD-MM-AAAA)</p>
      )}
      {info.editDate && <p className="editDate">{info.editDate}</p>}
    </div>
  );
};

export default CardPostit;
