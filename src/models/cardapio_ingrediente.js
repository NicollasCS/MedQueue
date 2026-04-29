const database = require('../config/database');
const { DataTypes } = require('sequelize');

const CardapioIngrediente = database.define(
  'CardapioIngrediente',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cardapioId: {
      type: DataTypes.INTEGER,
      reference: {
        model: 'Cardapio',
        key: 'id',
      },
    },
    ingredienteId: {
      type: DataTypes.INTEGER,
      reference: {
        model: 'Ingrediente',
        key: 'id',
      },
    },
  },
  {
    tableName: 'cardapio_ingredientes',
  },
);

module.exports = CardapioIngrediente;
