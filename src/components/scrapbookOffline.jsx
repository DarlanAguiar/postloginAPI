import React from "react";
import { FaRegWindowClose } from "react-icons/fa";

import "./scrapbookOffline.css";

const ScrapBookOffline = ({
  numberMessagesOffline,
  notShowMessageInSection,
  importMessagesIndexedBD,
  clickedDoNotAskAgain,
}) => {
  return (
    <div className="scrapbookOfflineContainer">
      <p
        className="closeScrapbookOffline"
        onClick={() => notShowMessageInSection()}
      >
        <FaRegWindowClose style={{ fontSize: "22px", color: "var(--colorFontPrimary)" }} />
      </p>
      <p className="scrapbookofflineParagraph">
        Você possui {numberMessagesOffline} recado
        {numberMessagesOffline > 1 ? "s" : ""} no modo OFFLINE, deseja anexar a
        esta página?
      </p>
      <div className="scrapbookButtons">
        <button
          className="buttonYes"
          onClick={() => importMessagesIndexedBD(true)}
        >
          Sim
        </button>
        <button
          className="buttonNegative"
          onClick={() => notShowMessageInSection()}
        >
          Agora não
        </button>
        <button className="buttonNoAsk" onClick={() => clickedDoNotAskAgain()}>
          Não perguntar novamente
        </button>
      </div>
    </div>
  );
};

export default ScrapBookOffline;
