const routes = require("./serverRoutes");
const express = require("express");
const { resolve } = require("path");

const cors = require("cors");

const app = express();

app.use(cors());

//preparando para ler JSON
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use("/", express.static(resolve(__dirname, "../build")));

//crud
app.use("/", routes);

app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("tudo funcionando");
});
