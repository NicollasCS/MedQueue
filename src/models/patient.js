const database = require('../config/database');
const { DataTypes } = require('sequelize');

const Patient = database.define(
  'Patient',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    cpf: {
      type: DataTypes.STRING(11),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [11, 11],
      },
    },
    data_nascimento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'pacientes',
  },
);

module.exports = Patient;