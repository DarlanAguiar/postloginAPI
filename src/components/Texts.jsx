import React from "react";
import { BsTrash } from "react-icons/bs";
import { HiRefresh } from "react-icons/hi";

import "./Texts.css";

const Texts = ({
  data,
  deletePost,
  editPost,
  dataEdit,
  setSearchMatch,
  setInfoUndo,
  setShowUndo,
  viewDeletdPost,
  fetchPostIts
}) => {
  let dados = dataEdit;


  const setTrashData = () => {
    //delete data.id
    data.trash = true;
   
    editPost(data);
  };

  return (
    <div className="texts">
      <div className="cabecalho">
        {data.share && <HiRefresh onClick={()=> fetchPostIts()}  className="textsRefresh"/> }

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
            if (viewDeletdPost) {
              deletePost(data.id, data);
              return;
            }
            setTrashData();
            setSearchMatch(false);
            setInfoUndo(data);
            setShowUndo(true);
            setTimeout(() => {
              setShowUndo(false);
            }, [7000]);
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
