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
  setDoc,
} = require("firebase/firestore");
//const { getAuth } = require("firebase/auth");
const { v4 } = require("uuid");

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

const admin = require("firebase-admin");
const serviceAccount = require("../firebase-adminCredenciais.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const { getAuth } = require("firebase-admin/auth");

const validateToken = async (userDB, token) => {
  let validToken = true;
  await getAuth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      const uid = decodedToken;
      if (uid.email !== userDB) {
        validToken = false;
      }
    })
    .catch((error) => {
      validToken = false;
      console.error(error);
    });

  return validToken;
};

// CRUD

router.get("/post/:userdb/:token", async (req, res) => {
  const userDB = req.params.userdb;
  const token = req.params.token;
  const validated = await validateToken(userDB, token);

  if (validated) {
    try {
      const result = await getDocs(query(collection(db, userDB)));
      let arrayData = [];

      result.docs.forEach((data) => {
        arrayData.push({
          id: data.id,
          title: data.data().title,
          message: data.data().message,
          checkList: data.data().checkList,
          date: data.data().date,
          editDate: data.data().editDate,
          share: data.data().share,
          trash: data.data().trash || false,
        });
      });

      res.status(200).json(arrayData);
    } catch (err) {
      console.error("Erro do serverRoutes: ", err);
      res.status(500).json({ error: "Erro interno do servidor (GET)" });
    }
  } else {
    res.status(500).json({ error: "Token de usuario invalido" });
  }
});

router.post("/post", async (req, res) => {
  const { data, userDB, token } = req.body;
  const validated = await validateToken(userDB, token);

  if (validated) {
    try {
      await addDoc(collection(db, userDB), data);
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(201).json({ message: "Iserido com sucesso" });
    } catch (err) {
      res.status(500).json({ error: "Erro interno do servidor (POST)" });
      console.error(err);
    }
  } else {
    res.status(500).json({ error: "Token de usuario invalido" });
  }
});

router.post("/post/share", async (req, res) => {
  const { data, userDB, token } = req.body;
  const validated = await validateToken(userDB, token);
  const id = v4();

  console.log(v4());
  console.log(data);
  console.log(userDB);
  console.log(token);

  if (validated) {
    try {
      await setDoc(doc(db, userDB, id), data);

      const userShared = data.share;
      data.share = userDB;

      await setDoc(doc(db, userShared, id), data);

      res.setHeader("Access-Control-Allow-Origin", "*");
      res.status(201).json({ message: "Iserido com sucesso" });
    } catch (err) {
      res.status(500).json({ error: "Erro interno do servidor (POST)" });
      console.error(err);
    }
  } else {
    res.status(500).json({ error: "Token de usuario invalido" });
  }
});

router.patch("/post", async (req, res) => {
  const { data, userDB, token } = req.body;
  const id = data.id;

  const validated = await validateToken(userDB, token);

  if (validated) {
    if (data.share) {
      const userShare = data.share;
      data.share = userDB;
      // let newData = data;
      // newData.share = userDB;
      await updateDoc(doc(db, userShare, id), data);

      data.share = userShare;
    }

    try {
      await updateDoc(doc(db, userDB, id), data);
      res.status(200).json({ message: "Atualizado com sucesso" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro interno do servidor (UPDATE)" });
    }
  } else {
    res.status(500).json({ error: "Token de usuario invalido" });
  }
});

router.delete("/post", async (req, res) => {
  const { id, userDB, token, data } = req.body;
  const validated = await validateToken(userDB, token);

  
  if (validated) {
    await deleteDoc(doc(db, userDB, id));
    if (data.share) {
      const userShare = data.share;
      await deleteDoc(doc(db, userShare, id));
    }

    try {
      await deleteDoc(doc(db, userDB, id));
      res.status(200).json({ message: "Deletado com sucesso" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro interno do servidor (DELETE)" });
    }
  } else {
    res.status(500).json({ error: "Token de usuario invalido" });
  }
});

//FIMCRUD

router.get("/login", (req, res) => {
  res.redirect("/");
});

module.exports = router;
