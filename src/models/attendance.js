const database = require('../config/database');
const { DataTypes } = require('sequelize');
const Patient = require('./patient');

const Attendance = database.define(
  'Attendance',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Patient,
        key: 'id',
      },
    },
    prioridade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    status: {
      type: DataTypes.ENUM('Aguardando', 'Em Atendimento', 'Finalizado'),
      defaultValue: 'Aguardando',
    },
    data_entrada: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    data_atendimento: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    data_finalizacao: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'atendimentos',
    timestamps: true,
  },
);

// Relacionamentos
Patient.hasMany(Attendance, { foreignKey: 'patientId' });
Attendance.belongsTo(Patient, { foreignKey: 'patientId' });

module.exports = Attendance;