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

const URL = "/post";
//const URL = "http://localhost:3000/post";

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
  let message = {};

  await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ data: data, userDB: userDB }),
  })
    .then((resp) => resp.json())
    .then((resp) => {
      console.log(resp)
      if (resp.error) {
        message = { error: resp.error };
      }
    });
  return message;

  /*  .catch((error) =>  {
        console.log(error)
        return error});
      //Não quer cair no error */
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
    .then((resp) => (arrayData = resp))
    .catch((err) => {
      arrayData = { error: "Problemas no servidor" };

      //mandar uma mensagem no APP de erros

      return arrayData;
    });

  return arrayData;
};

export const deleteData = async (id, userDB) => {

  let message = {};

  await fetch(URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ id: id, userDB: userDB }),
  })
  .then((resp) => resp.json())
  .then((resp) => {
    console.log(resp)
    if (resp.error) {
     message = { error: resp.error };
    }
  });
return message;
};

export const updateData = async (data, userDB) => {

  let message = {}

  await fetch(URL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ data: data, userDB: userDB }),
  })
  .then((resp) => resp.json())
  .then((resp) => {
    console.log(resp)
    if (resp.error) {
     message = { error: resp.error };
    }
  });
return message;
};
