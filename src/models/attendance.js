// ===============================
// src/models/attendance.js
// ===============================
const { DataTypes } = require("sequelize");
const db = require("../config/database");
const Patient = require("./patient");

const Attendance = db.define("attendances", {
  prioridade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "AGUARDANDO"
  }
});

Patient.hasMany(Attendance);
Attendance.belongsTo(Patient);

module.exports = Attendance;