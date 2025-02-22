'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BuyerEvent extends Model {
    static associate(models) {
      // Un evento de comprador pertenece a un comprador
      BuyerEvent.belongsTo(models.Buyer, { 
        foreignKey: 'buyerId', // Clave foránea en la tabla BuyerEvents
        as: 'buyer' // Alias para acceder al comprador del evento
      });
      // Un evento de comprador tiene una transacción
      BuyerEvent.hasOne(models.Transaction, {
        foreignKey: 'buyerEventId',
        as: 'transaction'
    });
    }
  }

  BuyerEvent.init({
    buyerId: {
      type: DataTypes.INTEGER, // Tipo de dato: número entero
      allowNull: false, // No permite valores nulos
      references: { // Referencia a la tabla Buyers
        model: 'Buyers', // Nombre de la tabla (plural)
        key: 'id' // Clave primaria de la tabla Buyers
      },
      comment: 'ID del comprador'
    },
    eventType: {
      type: DataTypes.ENUM('COMPRA', 'DEVOLUCIÓN', 'VISITA', 'CONSULTA DE DATOS', 'ACTUALIZACIÓN DE DATOS', 'DESCARGA DE FACTURAS'), // Tipo de dato: ENUM con valores específicos
      allowNull: false, // No permite valores nulos
      comment: 'Tipo de evento'
    },
    eventDate: {
      type: DataTypes.DATE, // Tipo de dato: fecha y hora
      allowNull: false, // No permite valores nulos
      defaultValue: DataTypes.NOW, // Valor por defecto: fecha y hora actual
      comment: 'Fecha y hora del evento'
    }
  }, {
    sequelize,
    modelName: 'BuyerEvent', // Nombre del modelo
    tableName: 'BuyerEvents', // Nombre de la tabla en la base de datos (plural)
    comment: 'Tabla de eventos de compradores'
  });

  return BuyerEvent;
};