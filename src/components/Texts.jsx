import React from "react";
import { BsTrash } from "react-icons/bs";

import "./Texts.css";

const Texts = ({ data, deletePost, editPost, dataEdit, setSearchMatch }) => {
  let dados = dataEdit;

  return (
    <div className="texts">
      <div className="cabecalho">
        <h4
          className={"titleTexts"}
          onBlur={(e) => {
            dados.title = e.target.textContent;
            editPost(dados);
          }}
          contentEditable={true}
          suppressContentEditableWarning={true}
        >
          {data.title.toUpperCase()}
        </h4>
        <button
          className="buttonX"
          onClick={() => {
            deletePost(data.id);
            setSearchMatch(false);
          }}
        >
          <BsTrash fontSize={18} color="var(--colorFontPrimary)" />
        </button>
      </div>
      <p
        className={"textContent"}
        onBlur={(e) => {
          dados.message = e.target.textContent;
          editPost(dados);
        }}
        contentEditable
        suppressContentEditableWarning={true}
      >
        {data.message}
      </p>
    </div>
  );
};

export default Texts;
