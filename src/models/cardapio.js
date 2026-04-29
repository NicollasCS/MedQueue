const database = require('../config/database');
const { DataTypes } = require('sequelize');

const Cardapio = database.define(
  'Cardapio',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preco: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    disponivel: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: 'cardapios',
  },
);

const Ingrediente = require('../models/ingrediente');
Cardapio.belongsToMany(Ingrediente, { through: 'CardapioIngrediente' });

module.exports = Cardapio;
