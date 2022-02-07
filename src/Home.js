import { useEffect, useState, useContext } from "react";
import { deleteData, fetchData, updateData } from "./database/firebase";
import {
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
const auth = getAuth(firebaseApp);

function Home() {
  const [menu, SetMenu] = useState(false);
  const [infoDB, setInfoDB] = useState([]);
  const [visibleSearch, setVisibleSearch] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const [ouvindo, setOuvindo] = useState(false);
  const [showModalError, setShowModalError] = useState(false);

  const { userEmail, setAuthenticated, setUserEmail } =
    useContext(AuthContexts);

  const navigate = useNavigate();

  useEffect(() => {
    fetchPostIts();
  }, []);

  const showMenu = () => {
    SetMenu(!menu);
  };

  async function fetchPostIts() {
    //se tiver um usuário uso o firebase
    if (userEmail) {
      const dados = await fetchData(userEmail);
      if (dados.error) {
        setShowModalError(true);
      } else {
        if (showModalError) {
          setShowModalError(false);
        }
        setInfoDB(dados);
      }
    } else {
      const dados = await fetchDataIndexED();
      setInfoDB(dados);
    }
  }

  const deletePost = async (id) => {
    if (userEmail) {
      const deleted = await deleteData(id, userEmail);
      if(deleted.error) setShowModalError(true)
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
      const update = await updateData(updatedData, userEmail);
      if(update.error) setShowModalError(true)
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

    const exti = await signOut(auth);

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
        <ImExit />
      </div>

      {showModalError && <ShowError handleLogout={handleLogout} />}

      <Footer />
    </div>
  );
}

export default Home;
