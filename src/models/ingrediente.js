const database = require('../config/database');
const { DataTypes } = require('sequelize');

const Ingrediente = database.define(
  'Ingrediente',
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
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'ingredientes',
  },
);

// Ingrediente.belongsToMany('Cardapio', { through: 'CardapioIngrediente' });

module.exports = Ingrediente;
