// ===============================
// index.js
// ===============================
const express = require("express");
const app = express();

const db = require("./src/config/database");
const routes = require("./src/routes");

app.use(express.json());
app.use(routes);

db.sync()
.then(() => {
  console.log("Banco conectado");
  app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
  });
})
.catch(err => console.log(err));