import { useEffect, useState, useContext } from "react";
import { deleteData, fetchData, updateData } from "./database/firebase";
import {
  checkDataOffline,
  deleteDataIndexED,
  fetchDataIndexED,
  updateDataIndexED,
} from "./database/database";
import { BsMic, BsSearch } from "react-icons/bs";
import moment from "moment";
import { TiPlus } from "react-icons/ti";
import { ImExit } from "react-icons/im";

import { RiSettings5Fill } from "react-icons/ri";

import CardPostit from "./components/CardPostit";
import Footer from "./components/Footer";
import Header from "./components/Header";

import { AuthContexts } from "./contexts/contexts";

import "./Home.css";

import { useNavigate } from "react-router-dom";

import { firebaseApp } from "./database/firebase";
import { getAuth, signOut } from "firebase/auth";
import ShowError from "./components/SHowError";
import ScrapBookOffline from "./components/scrapbookOffline";
import Settings from "./components/Settings";
import { organizeByScheme } from "./settingsFunctions/settingsFunction";
import { getConfigs } from "./database/stylesSettingsOnFirebase";
import Undo from "./components/Undo";
import { separateDeletedPost } from "./controller/fileHome";

const auth = getAuth(firebaseApp);

let doNotAskAgainButtonCounter;
if (localStorage.contPostIt) {
  let visitsNumber = Number(localStorage.contPostIt) + 1;
  localStorage.contPostIt = visitsNumber;
  doNotAskAgainButtonCounter = visitsNumber;
} else {
  localStorage.setItem("contPostIt", 11);
}
let numberMessageOf = 0;
function Home() {
  const [menu, SetMenu] = useState(false);
  const [infoUndo, setInfoUndo] = useState({});
  const [showUndo, setShowUndo] = useState(false);
  const [deletedPosts, setDeletedPosts] = useState([]);
  const [viewDeletdPost, setViewDeletdPost] = useState(false);
  const [infoDB, setInfoDB] = useState([]);
  const [visibleSearch, setVisibleSearch] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const [ouvindo, setOuvindo] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [showScrapBookOffline, setShowScrapBookOffline] = useState(false);
  const [clickedCloseImportPostIt, setClickedCloseImportPostIt] =
    useState(false);
  const [showComponentSettings, setShowComponentSettings] = useState(false);

  const {
    userEmail,
    setAuthenticated,
    setUserEmail,
    showInfoIndexED,
    token,
    theme,
    setTheme,
    setOrganization,
    idConfiguration,
    setIdConfiguration,
  } = useContext(AuthContexts);

  const navigate = useNavigate();

  const notShowMessageInSection = () => {
    setClickedCloseImportPostIt(true);
    setShowScrapBookOffline(false);
  };

  const organizeBySettings = (configFromFirebase, scheme, data) => {
    let configuration;

    if (configFromFirebase) {
      configuration = configFromFirebase;
    } else {
      configuration = {
        id: idConfiguration,
        theme: theme,
        organization: scheme,
        user: userEmail,
      };
      data = infoDB;
    }

    const organizedData = organizeByScheme(data, scheme, configuration);

    setInfoDB(organizedData);
  };

  useEffect(() => {
    fetchPostIts();
  }, [userEmail, viewDeletdPost]);

  const showMenu = () => {
    SetMenu(!menu);
  };

  const clickedDoNotAskAgain = () => {
    setShowScrapBookOffline(false);
    localStorage.contPostIt = 0;
  };

  const importMessagesIndexedBD = async () => {
    setShowScrapBookOffline(false);
    await checkDataOffline(userEmail, token);
    fetchPostIts();
  };

  async function fetchPostIts() {
    //se tiver um usuário uso o firebase
    if (userEmail) {
      const dataDB = await fetchData(userEmail, token);

      const dataOff = await checkDataOffline();
      numberMessageOf = dataOff.length;
      if (
        !clickedCloseImportPostIt &&
        Number(doNotAskAgainButtonCounter) > 10
      ) {
        setTimeout(() => {
          if (numberMessageOf > 0) {
            setShowScrapBookOffline(true);
          }
        }, 2000);
      }

      if (dataDB.error) {
        setShowModalError(true);
        console.error(dataDB.error);
      } else {
        if (showModalError) {
          setShowModalError(false);
        }

        const configs = await getConfigs(userEmail);
        if (configs === undefined) {
          setInfoDB(dataDB);
        } else {
          const separatePosts = separateDeletedPost(dataDB);
          const arrayPost = separatePosts[0];
          const arrayDeletedPost = separatePosts[1];

          setDeletedPosts(arrayDeletedPost);
          setInfoDB(arrayPost);

          setOrganization(configs.organization);
          setTheme(configs.theme);
          setIdConfiguration(configs.id);
          //applyTheme(configs.theme)
          organizeBySettings(
            configs,
            configs.organization,
            viewDeletdPost ? arrayDeletedPost : arrayPost
          );
        }
      }
    } else {
      const dataDB = await fetchDataIndexED();
      if (showInfoIndexED) setInfoDB(dataDB);
    }
  }

  const clearTrash = () => {
    deletedPosts.forEach((post) => {
      deletePost(post.id);
    });
  };

  const deletePost = async (id, data) => {
    if (userEmail) {
      const deleted = await deleteData(id, userEmail, token, data);
      if (deleted.error) {
        setShowModalError(true);
        console.error(deleted.error);
      }
    } else {
      deleteDataIndexED(id);
    }

    fetchPostIts();
  };

  const editPost = async (data) => {
    const dataAtual = `Editado ${moment().format("DD/MM/YYYY H:mm")}`;

    const updatedData = {
      id: data.id,
      title: data.title,
      message: data.message,
      checkList: data.checkList,
      date: data.date,
      trash: data.trash,
      editDate: dataAtual,
    };

    if (data.share) {
      updatedData.share = data.share;
    }

    if (userEmail) {
      const update = await updateData(updatedData, userEmail, token);
      if (update.error) {
        setShowModalError(true);
        console.error(update.error);
      }
    } else {
      updateDataIndexED(updatedData);
    }

    fetchPostIts();
  };

  const showSearch = () => {
    setVisibleSearch(!visibleSearch);
  };

  //search to voice:
  let reconhecimento = null;

  let reconhecimentoDeFala =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (reconhecimentoDeFala !== undefined) {
    reconhecimento = new reconhecimentoDeFala();
  }

  const handleMicClick = () => {
    if (reconhecimento !== null) {
      reconhecimento.onstart = () => {
        setOuvindo(true);
      };

      reconhecimento.onend = () => {
        setOuvindo(false);
      };

      reconhecimento.onresult = (e) => {
        setTextSearch(e.results[0][0].transcript);
      };

      reconhecimento.start();
    }
  };

  const handleLogout = async () => {
    setAuthenticated(false);
    setUserEmail(null);

    await signOut(auth);

    navigate("/login");
  };

  const handleShowSettings = () => {
    setShowComponentSettings(!showComponentSettings);
  };

  return (
    <div className="body">
      <Header
        show={menu}
        setShow={showMenu}
        fetchPostIts={fetchPostIts}
        setShowModalError={setShowModalError}
      />

      {viewDeletdPost &&
        (deletedPosts.length === 0 ? (
          <h1 className="homeZeroPosts">Lixeira Vazia</h1>
        ) : (
          ""
        ))}

      <Settings
        showSettings={showComponentSettings}
        handleShowSettings={handleShowSettings}
        numberMessageOf={numberMessageOf}
        importMessagesIndexedBD={importMessagesIndexedBD}
        organizeBySettings={organizeBySettings}
        setInfoDB={setInfoDB}
        deletedPosts={deletedPosts}
        setViewDeletdPost={setViewDeletdPost}
        clearTrash={clearTrash}
      />

      {showScrapBookOffline && (
        <ScrapBookOffline
          numberMessagesOffline={numberMessageOf}
          notShowMessageInSection={notShowMessageInSection}
          importMessagesIndexedBD={importMessagesIndexedBD}
          clickedDoNotAskAgain={clickedDoNotAskAgain}
        />
      )}

      {infoDB.map((info, id) => (
        <CardPostit
          info={info}
          deletePost={deletePost}
          editPost={editPost}
          textInputSearch={textSearch}
          key={id}
          setInfoUndo={setInfoUndo}
          setShowUndo={setShowUndo}
          viewDeletdPost={viewDeletdPost}
          fetchPostIts={fetchPostIts}
        />
      ))}

      <button className="botao-adicionar" onClick={showMenu}>
        <TiPlus fontSize={30} />
      </button>

      <button
        className="homeButtonCloseTrash"
        onClick={() => {
          setViewDeletdPost(false);
        }}
        style={{ left: viewDeletdPost ? "8px" : "-200px" }}
      >
        Fechar lixeira
      </button>

      <div
        className="containerSearch"
        style={{ left: visibleSearch ? "3px" : "-132px" }}
      >
        <div className="containerInputMic">
          <input
            type={"search"}
            value={textSearch}
            onChange={(e) => {
              setTextSearch(e.target.value);
            }}
          />
          <BsMic
            fontSize={20}
            width={20}
            style={{ color: ouvindo ? "#126ece" : "black" }}
            onClick={handleMicClick}
          />
        </div>
        <BsSearch
          color="var(--colorFontPrimary)"
          fontSize={27}
          onClick={showSearch}
          className={"lupa"}
        />
      </div>

      <Undo
        infoUndo={infoUndo}
        userEmail={userEmail}
        token={token}
        fetchPostIts={fetchPostIts}
        setShowUndo={setShowUndo}
        showUndo={showUndo}
      />

      <RiSettings5Fill
        className="homeBottonSettings"
        onClick={handleShowSettings}
      />

      <ImExit onClick={handleLogout} className="homeButtonExit" />

      {showModalError && <ShowError handleLogout={handleLogout} />}

      <Footer />
    </div>
  );
}

export default Home;
