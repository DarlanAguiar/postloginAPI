import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC78uH7W_visZbGpxA_g41j4_2-GxAJKXw",
  authDomain: "post-7235e.firebaseapp.com",
  projectId: "post-7235e",
  storageBucket: "post-7235e.appspot.com",
  messagingSenderId: "498234609918",
  appId: "1:498234609918:web:8763af2dcf678a31df15af",
};

export const firebaseApp = initializeApp(firebaseConfig);

//const URL = "http://localhost:3000/post";
const URL = "/post";

/* export const firebaseApp = async () =>{
  
  await fetch(`${URL}/config`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
  .then((resp) => resp.json())
  .then((resp) => initializeApp(resp));

} */

export const salvarDados = async (data, userDB) => {
  await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ data: data, userDB: userDB }),
  }).then((resp) => resp.json());
};

export const fetchData = async (userDB) => {
  let arrayData = [];

  await fetch(`${URL}/${userDB}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((resp) => resp.json())
    .then((resp) => (arrayData = resp));

  return arrayData;
};

export const deleteData = async (id, userDB) => {
  await fetch(URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ id: id, userDB: userDB }),
  })
    .then((resp) => resp.json())
    .then((resp) => console.log(resp));
};

export const updateData = async (data, userDB) => {
  await fetch(URL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ data: data, userDB: userDB }),
  })
    .then((resp) => resp.json())
    .then((resp) => console.log(resp));
};
