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
const auth = getAuth(firebaseApp);


let buttonCounterAskAgain;
if(localStorage.contPostIt){
  let visitsNumber = Number(localStorage.contPostIt) + 1
  localStorage.contPostIt = visitsNumber
  buttonCounterAskAgain = visitsNumber
}
let numberMessageOf = 0
function Home() {
  const [menu, SetMenu] = useState(false);
  const [infoDB, setInfoDB] = useState([]);
  const [visibleSearch, setVisibleSearch] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const [ouvindo, setOuvindo] = useState(false);
  const [showModalError, setShowModalError] = useState(false);

  const [showScrapBookOffline, setShowScrapBookOffline] = useState(false);
  //const [numberMessagesOffline, setNumberMessagesOffline] = useState(0);
  const [clicouFechar, setClicouFechar] = useState(false);

  const notShowMessageInSection = () => {
    setClicouFechar(true);
    setShowScrapBookOffline(false);
  };

  const { userEmail, setAuthenticated, setUserEmail, showInfoIndexED, token } =
    useContext(AuthContexts);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPostIts();
  }, [userEmail]);

  const showMenu = () => {
    SetMenu(!menu);
  };



  const clickedDoNotAskAgain = () => {
    setShowScrapBookOffline(false)
    localStorage.setItem("contPostIt", "0")
  }


  const importMessagesIndexedBD = async () => {
    setShowScrapBookOffline(false)
    await checkDataOffline(userEmail, token)
    fetchPostIts()
  }
 
  async function fetchPostIts() {
    //se tiver um usuário uso o firebase
    if (userEmail) {
      const dataDB = await fetchData(userEmail, token);
      if (!clicouFechar && buttonCounterAskAgain > 10 ) {
        const dataOff = await checkDataOffline();
        //setNumberMessagesOffline(dataOff.length);
        numberMessageOf = (dataOff.length)
        setTimeout(() => {
          if (dataOff.length > 0) {
            setShowScrapBookOffline(true);
          }
        }, 3000);
        
      }

      if (dataDB.error) {
        setShowModalError(true);
        console.error(dataDB.error);
      } else {
        if (showModalError) {
          setShowModalError(false);
        }
        setInfoDB(dataDB);
      }
    } else {
      const dataDB = await fetchDataIndexED();
      if (showInfoIndexED) setInfoDB(dataDB);
    }
  }

  const deletePost = async (id) => {
    if (userEmail) {
      const deleted = await deleteData(id, userEmail, token);
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
      editDate: dataAtual,
    };

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

  return (
    <div className="body">
      <Header
        show={menu}
        setShow={showMenu}
        fetchPostIts={fetchPostIts}
        setShowModalError={setShowModalError}
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
        />
      ))}

      <button className="botao-adicionar" onClick={showMenu}>
        <TiPlus fontSize={30} />
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
          color="chartreuse"
          fontSize={27}
          onClick={showSearch}
          className={"lupa"}
        />
      </div>
      <div onClick={handleLogout} className="exit">
        <ImExit style={{ fontSize: "22px" }} />
      </div>

      {showModalError && <ShowError handleLogout={handleLogout} />}

      <Footer />
    </div>
  );
}

export default Home;
