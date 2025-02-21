'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      // Una transacción pertenece a un comprador
      Transaction.belongsTo(models.Buyer, { 
        foreignKey: 'buyer_id', // Clave foránea en la tabla Transactions
        as: 'buyer' // Alias para acceder al comprador de la transacción
      });
      // Una transacción pertenece a un producto
      Transaction.belongsTo(models.Product, { 
        foreignKey: 'product_id', // Clave foránea en la tabla Transactions
        as: 'product' // Alias para acceder al producto de la transacción
      });
    }
  }

  Transaction.init({
    buyer_id: {
      type: DataTypes.INTEGER, // Tipo de dato: número entero
      allowNull: false, // No permite valores nulos
      references: { // Referencia a la tabla Buyers
        model: 'Buyers', // Nombre de la tabla (plural)
        key: 'id' // Clave primaria de la tabla Buyers
      },
      comment: 'ID del comprador'
    },
    product_id: {
      type: DataTypes.INTEGER, // Tipo de dato: número entero
      allowNull: false, // No permite valores nulos
      references: { // Referencia a la tabla Products
        model: 'Products', // Nombre de la tabla (plural)
        key: 'id' // Clave primaria de la tabla Products
      },
      comment: 'ID del producto'
    },
    price_paid: {
      type: DataTypes.FLOAT, // Tipo de dato: número decimal
      allowNull: false, // No permite valores nulos
      validate: { // Validaciones para el precio pagado
        isFloat: true, // Debe ser un número decimal
        min: 0 // No puede ser negativo
      },
      comment: 'Precio pagado por la transacción'
    },
    tax: {
      type: DataTypes.FLOAT, // Tipo de dato: número decimal
      allowNull: false, // No permite valores nulos
      validate: { // Validaciones para el impuesto
        isFloat: true, // Debe ser un número decimal
        min: 0 // No puede ser negativo
      },
      comment: 'Impuesto de la transacción'
    },
    transaction_date: {
      type: DataTypes.DATE, // Tipo de dato: fecha y hora
      allowNull: false, // No permite valores nulos
      defaultValue: DataTypes.NOW, // Valor por defecto: fecha y hora actual
      comment: 'Fecha y hora de la transacción'
    }
  }, {
    sequelize,
    modelName: 'Transaction', // Nombre del modelo
    tableName: 'Transactions', // Nombre de la tabla en la base de datos (plural)
    comment: 'Tabla de transacciones'
  });

  return Transaction;
};