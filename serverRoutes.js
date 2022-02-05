const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const {
  collection,
  getDocs,
  query,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
} = require("firebase/firestore");

const router = require("express").Router();

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

/* router.get("/config", (req, res)=> {
  
  try {
    res.status(200).json(firebaseConfig)
    
  } catch (error) {
    console.log(error);
  }
}) */

router.get("/post/:userdb", async (req, res) => {
  const userDB = req.params.userdb;

  try {
    const result = await getDocs(query(collection(db, userDB)));
    let arrayData = [];

    result.docs.map((data) => {
      arrayData.push({
        id: data.id,
        title: data.data().title,
        message: data.data().message,
        checkList: data.data().checkList,
        date: data.data().date,
        editDate: data.data().editDate,
      });
    });

    res.status(200).json(arrayData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.post("/post", async (req, res) => {
  const { data, userDB } = req.body;

  try {
    await addDoc(collection(db, userDB), data);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(201).json({ message: "Iserido com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.patch("/post", async (req, res) => {
  const { data, userDB } = req.body;
  const id = data.id;

  try {
    await updateDoc(doc(db, userDB, id), data);
    res.status(200).json("Atualizado com sucesso");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.delete("/post", async (req, res) => {
  const { id, userDB } = req.body;

  try {
    await deleteDoc(doc(db, userDB, id));
    res.status(200).json("Deletado com sucesso");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

module.exports = router;
