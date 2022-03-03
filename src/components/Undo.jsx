import React from "react";
import { updateData } from "../database/firebase";
import { salvarDadosIndexED } from "../database/database";

import "./Undo.css";

const Undo = ({ infoUndo, userEmail, token, fetchPostIts, showUndo, setShowUndo}) => {
  const addDb = async () => {
    const data = infoUndo
    data.trash = false;

    if (userEmail) {
      await updateData(data, userEmail, token);

    } else {
      salvarDadosIndexED(data);
    }

    fetchPostIts();
  };

  return (
    <button style={{ right: showUndo? "15px" : "-210px" }}
      className="buttonUndo"
      onClick={() => {
      addDb();
      setShowUndo(false)

      }}
    >
      Desfazer o excluir
    </button>
  );
};

export default Undo;
