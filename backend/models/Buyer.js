'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Buyer extends Model {
    static associate(models) {
      // Un comprador puede tener muchas transacciones
      Buyer.hasMany(models.Transaction, { 
        foreignKey: 'buyerId', // Clave foránea en la tabla Transactions
        as: 'transactions' // Alias para acceder a las transacciones del comprador
      });
      // Un comprador puede tener muchos eventos de comprador
      Buyer.hasMany(models.BuyerEvent, {
        foreignKey: 'buyerId', // Clave foránea en la tabla BuyerEvents
        as: 'events' // Alias para acceder a los eventos del comprador
      });
    }
  }

  Buyer.init({
    firstName: {
      type: DataTypes.STRING, // Tipo de dato: cadena de texto
      allowNull: false, // No permite valores nulos
      comment: 'Nombre del comprador'
    },
    lastName: {
      type: DataTypes.STRING, // Tipo de dato: cadena de texto
      allowNull: false, // No permite valores nulos
      comment: 'Apellido del comprador'
    },
    documentId: {
      type: DataTypes.STRING, // Tipo de dato: cadena de texto
      allowNull: false, // No permite valores nulos
      comment: 'Número de documento del comprador'
    },
    documentType: {
      type: DataTypes.STRING, // Tipo de dato: cadena de texto
      allowNull: false, // No permite valores nulos
      comment: 'Tipo de documento del comprador'
    }
  }, {
    sequelize,
    modelName: 'Buyer', // Nombre del modelo
    tableName: 'Buyers', // Nombre de la tabla en la base de datos (plural)
    comment: 'Tabla de compradores'
  });

  return Buyer;
};