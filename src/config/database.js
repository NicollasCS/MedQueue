// ===============================
// src/config/database.js
// ===============================
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "medqueue",       // nome do banco
  "postgres",       // usuário
  "123456",         // senha (troca pela sua)
  {
    host: "localhost",
    dialect: "postgres",
    port: 5432
  }
);

module.exports = sequelize;