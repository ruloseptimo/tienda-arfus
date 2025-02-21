'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Buyer extends Model {
    static associate(models) {
      // Un comprador puede tener muchas transacciones
      Buyer.hasMany(models.Transaction, { 
        foreignKey: 'buyer_id', // Clave foránea en la tabla Transactions
        as: 'transactions' // Alias para acceder a las transacciones del comprador
      });
      // Un comprador puede tener muchos eventos de comprador
      Buyer.hasMany(models.BuyerEvent, {
        foreignKey: 'buyer_id', // Clave foránea en la tabla BuyerEvents
        as: 'events' // Alias para acceder a los eventos del comprador
      });
    }
  }

  Buyer.init({
    first_name: {
      type: DataTypes.STRING, // Tipo de dato: cadena de texto
      allowNull: false, // No permite valores nulos
      comment: 'Nombre del comprador'
    },
    last_name: {
      type: DataTypes.STRING, // Tipo de dato: cadena de texto
      allowNull: false, // No permite valores nulos
      comment: 'Apellido del comprador'
    },
    document_id: {
      type: DataTypes.STRING, // Tipo de dato: cadena de texto
      allowNull: false, // No permite valores nulos
      unique: true, // Debe ser único
      comment: 'Número de documento del comprador'
    },
    document_type: {
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