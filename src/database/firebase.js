import { v4 as uuidv4 } from "uuid";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC78uH7W_visZbGpxA_g41j4_2-GxAJKXw",
  authDomain: "post-7235e.firebaseapp.com",
  projectId: "post-7235e",
  storageBucket: "post-7235e.appspot.com",
  messagingSenderId: "498234609918",
  appId: "1:498234609918:web:8763af2dcf678a31df15af",
};

export const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore();

//const URL = "/post";
const URL = "http://localhost:3000/post";

export const salvarDados = async (data, userDB, token) => {
  let message = {};

  await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ data: data, userDB: userDB, token: token }),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      console.log(resp);
      if (resp.error) {
        message = { error: resp.error };
      }
    });
  return message;
};

export const fetchData = async (userDB, token) => {
  let arrayData = [];

  await fetch(`${URL}/${userDB}/${token}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((resp) => {
      const parsedResp = resp.json();

      return parsedResp;
    })
    .then((resp) => (arrayData = resp))
    .catch((err) => {
      console.log("Inicio do catch");

      arrayData = { error: "Problemas no servidor" };

      console.log(err);

      return arrayData;
    });

  return arrayData;
};

export const deleteData = async (id, userDB, token, data) => {
  let message = {};

  await fetch(URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ id: id, userDB: userDB, token: token, data: data }),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      console.log(resp);
      if (resp.error) {
        message = { error: resp.error };
      }
    });
  return message;
};

export const updateData = async (data, userDB, token) => {
  let message = {};

  await fetch(URL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ data: data, userDB: userDB, token: token }),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      if (resp.error) {
        message = { error: resp.error };
      }
    });
  return message;
};

export const addSharePost = async (userLocal, data) => {
  const id = uuidv4();
  const userShared = data.share;

  await setDoc(doc(db, userLocal, id), data);

  data.share = userLocal;

  await setDoc(doc(db, userShared, id), data);
};
