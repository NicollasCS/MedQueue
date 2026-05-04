// ===============================
// src/models/patient.js
// ===============================
const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Patient = db.define("patients", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  nascimento: {
    type: DataTypes.DATEONLY
  },
  telefone: {
    type: DataTypes.STRING
  }
});

module.exports = Patient;