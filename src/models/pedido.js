const database = require('../config/database');
const { DataTypes } = require('sequelize');

const Pedido = database.define(
  'Pedido',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cliente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preco: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    descricao: {
      type: DataTypes.STRING,
    },
    estado: {
      type: DataTypes.STRING,
      defaultValue: 'Em Preparo',
    },
  },
  {
    tableName: 'pedidos',
    timestamps: true,
  },
);

module.exports = Pedido;
