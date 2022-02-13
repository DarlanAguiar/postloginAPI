import {salvarDados} from "./firebase"

let bancoDeDados;
let bancoDeDadosInicializado = false;
const nomeDoBancoDeDados = "dbpostreact";
const nomeDaLista = "listareact";

async function initBD() {
  if (!bancoDeDadosInicializado) {
    bancoDeDadosInicializado = true;
    await criaBancoDeDados();
  }
}

function criaBancoDeDados() {
  return new Promise((resolve, reject) => {
    let requisicao = window.indexedDB.open(nomeDoBancoDeDados, 2);

    requisicao.onsuccess = (evento) => {
      bancoDeDados = requisicao.result;
      //console.log("banco de dados criado", evento, bancoDeDados);
      resolve();
    };

    requisicao.onupgradeneeded = (evento) => {
      bancoDeDados = evento.target.result;
      if (bancoDeDados.objectStoreNames.contains(nomeDaLista)) {
        return;
      }

      const objetoSalvo = bancoDeDados.createObjectStore(nomeDaLista, {
        keyPath: "id",
        autoIncrement: true,
      });

      objetoSalvo.createIndex("lembretereact", "lembretereact", {
        unique: false,
      });

      //console.log("houve um upgrade", evento)
    };

    requisicao.onerror = (evento) => {
      console.log("hove um erro", evento);
      reject();
    };
  });
}

export function salvarDadosIndexED(data, userDB, token) {
  let localParaAdicionar = bancoDeDados.transaction([nomeDaLista], "readwrite");

  let listaParaAdicionar = localParaAdicionar.objectStore(nomeDaLista);

  let newItem = {
    title: data.title,
    message: data.message,
    date: data.date,
    checkList: data.checkList,
    editDate: "",
  };

  listaParaAdicionar.add(newItem);
  /* const email = "darlangaguiar@gmail.com"
  const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImYyNGYzMTQ4MTk3ZWNlYTUyOTE3YzNmMTgzOGFiNWQ0ODg3ZWEwNzYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiRGFybGFuIGdvbWVzIGFndWlhciIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHaTl5cjlad01Xa0FQUE80VkdVZzMtUXE5a25ldFpua3JUeVJ4aUExOFE9czk2LWMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcG9zdC03MjM1ZSIsImF1ZCI6InBvc3QtNzIzNWUiLCJhdXRoX3RpbWUiOjE2NDQ3Mzk0MjAsInVzZXJfaWQiOiJPVFFyRG1GOGw0ZTh2enI4Nk5yOTJFZ3hpSmwyIiwic3ViIjoiT1RRckRtRjhsNGU4dnpyODZOcjkyRWd4aUpsMiIsImlhdCI6MTY0NDczOTQyMCwiZXhwIjoxNjQ0NzQzMDIwLCJlbWFpbCI6ImRhcmxhbmdhZ3VpYXJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDk4NDk0NTY2OTg3MTE5NzA1MjMiXSwiZW1haWwiOlsiZGFybGFuZ2FndWlhckBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.HBbLTgRaGmHTB59VEFuITxE4thZ5CVc-8qui06wumPG7dG7oaLFaDjQm4yFbdzRjvjJunQ_UiT7sJe3zOFF792lV66CtjvVpQG8HklhlmSkNy86hNm58FAC_gnwVnY5tX5aPls-6QujQXpyaoNpunnYifFyBK3kQj6dpKt_sISmNcx-UJqct3xFm9cjoWRmqg3HW8KuYWfuSv2D_NSSb-FIRv4LYxMsObnuvUkAqaxZSDPhrb18ndiOtUE9fe0p2MIMi-mOiSU1Kt4Dbo7eFwAOudUZ5yLospIX_5sq5lBFqzIwdVcYHfYd_RyR5LRYwqT5VPsIA1koTAAviSwGg0g"
  salvarDados(newItem, email, token); */
}

export const deleteDataIndexED = (id) => {
  let localParaAdicionar = bancoDeDados.transaction([nomeDaLista], "readwrite");
  let listaParaAdicionar = localParaAdicionar.objectStore(nomeDaLista);

  listaParaAdicionar.delete(id);
};

export const updateDataIndexED = (updatedData) => {
  let localParaAdicionar = bancoDeDados.transaction([nomeDaLista], "readwrite");
  let listaParaAdicionar = localParaAdicionar.objectStore(nomeDaLista);
  listaParaAdicionar.put(updatedData);
};

export async function fetchDataIndexED() {
  await initBD();
  const dataPromise = new Promise((resolve) => {
    var dados = [];

    let objetoGuardado = bancoDeDados
      .transaction(nomeDaLista)
      .objectStore(nomeDaLista);

    objetoGuardado.openCursor().onsuccess = (evento) => {
      const cursor = evento.target.result;

      if (cursor) {
        const title = cursor.value.title;
        const text = cursor.value.message;
        const checkList = cursor.value.checkList;
        const date = cursor.value.date;
        const id = cursor.value.id;
        const editDate = cursor.value.editDate;

        dados.push({
          id: id,
          title: title,
          message: text,
          checkList: checkList,
          date: date,
          editDate: editDate,
        });

        cursor.continue();
      } else {
        resolve(dados);
      }
    };
  });
  const returnedData = await dataPromise;
  return returnedData;
}

export async function checkDataOffline(userEmail, token) {
  await initBD();
  const dataPromise = new Promise((resolve) => {
    var dados = [];

    let objetoGuardado = bancoDeDados
      .transaction(nomeDaLista)
      .objectStore(nomeDaLista);

    objetoGuardado.openCursor().onsuccess = (evento) => {
      const cursor = evento.target.result;

      if (cursor) {
        const title = cursor.value.title;
        const text = cursor.value.message;
        const checkList = cursor.value.checkList;
        const date = cursor.value.date;
        const id = cursor.value.id;
        const editDate = cursor.value.editDate;

        if(userEmail){

          const data = {
            id: id,
            title: title,
            message: text,
            checkList: checkList,
            date: date,
            editDate: editDate,
          };
          
          salvarDados(data, userEmail, token)
          deleteDataIndexED(id)
          
        }
        dados.push({
          id: id,
          title: title,
          message: text,
          checkList: checkList,
          date: date,
          editDate: editDate,
        });

        cursor.continue();
      } else {
        resolve(dados);
      }
    };
  });
  const returnedData = await dataPromise;
  return returnedData;
}
