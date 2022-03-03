import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import {
  collection,
  getDocs,
  query,
  doc,
  addDoc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC78uH7W_visZbGpxA_g41j4_2-GxAJKXw",
  authDomain: "post-7235e.firebaseapp.com",
  projectId: "post-7235e",
  storageBucket: "post-7235e.appspot.com",
  messagingSenderId: "498234609918",
  appId: "1:498234609918:web:8763af2dcf678a31df15af",
};
initializeApp(firebaseConfig);

const db = getFirestore();

export const salvarConfigs = async (data) => {
  const userConfig = `${data.user}.config`;
  console.log(data);
  console.log(userConfig);

  await addDoc(collection(db, userConfig), data);
};

export const getConfigs = async (user) => {
  const userDB = `${user}.config`;
  const result = await getDocs(query(collection(db, userDB)));

  let configs;

  result.docs.forEach((data) => {
    configs = {
      id: data.id,
      theme: data.data().theme,
      organization: data.data().organization,
      user: data.data().user,
    };
  });

  return configs;
};

export const updateConfigs = async (data) => {
  const userConfig = `${data.user}.config`;

  // const configs = {
  //   theme: data.theme,
  //   organization: data.organization,
  //   user: data.user,
  // };

  await updateDoc(doc(db, userConfig, data.id), data);
};

