import React, { useContext } from "react";

import { applyTheme } from "../settingsFunctions/settingsFunction";
import { FaWindowClose } from "react-icons/fa";

import { AuthContexts } from "../contexts/contexts";

import "./Settings.css";

function Settings({
  showSettings,
  handleShowSettings,
  numberMessageOf,
  importMessagesIndexedBD,
  organizeBySettings,
}) {
  const { userEmail, setTheme, organization } = useContext(AuthContexts);

  const apply = (theme) => {
    setTheme(theme);
    const configuration = {
      theme: theme,
      organization: organization,
      user: userEmail,
    };

    applyTheme(theme, configuration);
  };

  return (
    <div
      className="settingsContainer"
      style={{ right: showSettings ? "" : "-500px" }}
    >
      <h2 className="settingsTitle">Configurações rápidas</h2>
      <FaWindowClose
        className="settingsButtonClose"
        onClick={() => handleShowSettings()}
      />
      <hr />

      <h3 className="settingsTheme">Tema</h3>
      <div className="settingsThemeButtons">
        <button onClick={() => apply("clear")}>Claro</button>
        <button className="buttonDarkPink" onClick={() => apply("darkPink")}>
          Rosa escuro
        </button>
        <button className="buttonDark" onClick={() => apply("dark")}>
          Escuro
        </button>
      </div>

      <hr />

      <h3 className="settingsOrganization">Organizar posts</h3>
      <div className="settingsOrganizationButtons">
        <button
          onClick={() => {
            organizeBySettings(false, "byTitle");
          }}
        >
          Titulo
        </button>
        <button
          onClick={() => {
            organizeBySettings(false, "byChecks");
          }}
        >
          Qtd de checks
        </button>
        <button
          onClick={() => {
            organizeBySettings(false, "byDate");
          }}
        >
          Data
        </button>
      </div>
      <hr />
      {numberMessageOf > 0 ? (
        <div>
          <p className="settingsQtdPostOff">
            Você Possui {numberMessageOf} Post{numberMessageOf > 1 ? "s" : ""}{" "}
            no modo OFFLINE
          </p>

          <button
            className="settingsImportPostOffline"
            onClick={importMessagesIndexedBD}
          >
            Importar PostIT offline
          </button>
        </div>
      ) : (
        <p className="settingsQtdPostOff">
          Você não Possui Posts no modo OFFLINE
        </p>
      )}
    </div>
  );
}

export default Settings;
