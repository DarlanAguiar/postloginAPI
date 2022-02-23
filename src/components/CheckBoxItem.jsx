import React, { useState, useEffect } from "react";
import { GiCheckMark } from "react-icons/gi";
import { MdClose } from "react-icons/md";

import "./CheckBoxItem.css";

const CheckBoxItem = ({ dataItem, data, indice, editPost }) => {
  const dados = data;

  const [clickOnDelete, setClickOnDelete] = useState(false);

  const [checkedItem, setcheckedItem] = useState(dataItem.check);

  const deleteRow = (index) => {
    const deletedRow = dados.checkList.filter((item, i) => i !== index);
    dados.checkList = deletedRow;
    editPost(dados);
  };

  useEffect(() => {
    setClickOnDelete(false);
    setcheckedItem(dataItem.check);
  }, [data, dataItem]);

  return (
    <div
      className={"card_div_checar_item"}
      style={{
        borderLeft: dataItem.check ? "" : "2px solid var(--colorFontPrimary)",
        opacity: clickOnDelete ? "0" : "100",
      }}
    >
      <p
        className={"card_item_check"}
        contentEditable
        suppressContentEditableWarning={true}
        onBlur={(e) => {
          dados.checkList[indice].text = e.target.textContent;
          editPost(dados);
        }}
        style={{ color: dataItem.check ? "var(--colorFontDisabled)" : "" }}
      >
        {dataItem.text}
      </p>
      <div className="buttons">
        <button
          className="button_check"
          onClick={() => {
            setcheckedItem(!checkedItem);
            dados.checkList[indice].check = !dados.checkList[indice].check;
            editPost(dados);
          }}
        >
          <GiCheckMark
            fontSize={14}
            style={{
              color: checkedItem
                ? "var(--colorFontDisabled)"
                : "var(--colorFontPrimary)",
            }}
          />
        </button>
        <button
          className="button_apagar_check"
          onClick={() => {
            deleteRow(indice);
            setClickOnDelete(true);
          }}
        >
          <MdClose fontSize={19} color="var(--colorFontPrimary)" />
        </button>
      </div>
    </div>
  );
};

export default CheckBoxItem;
