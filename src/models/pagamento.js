const database = require('../config/database');
const { DataTypes } = require('sequelize');

const Pagamento = database.define(
  'Pagamento',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pedidoId: {
      type: DataTypes.INTEGER,
      reference: {
        model: 'Pedido',
        key: 'id',
      },
    },
    metodo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'pagamentos',
    timestamps: true,
  },
);

module.exports = Pagamento;
