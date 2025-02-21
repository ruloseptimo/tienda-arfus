'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BuyerEvent extends Model {
    static associate(models) {
      // Un evento de comprador pertenece a un comprador
      BuyerEvent.belongsTo(models.Buyer, { 
        foreignKey: 'buyer_id', // Clave foránea en la tabla BuyerEvents
        as: 'buyer' // Alias para acceder al comprador del evento
      });
    }
  }

  BuyerEvent.init({
    buyer_id: {
      type: DataTypes.INTEGER, // Tipo de dato: número entero
      allowNull: false, // No permite valores nulos
      references: { // Referencia a la tabla Buyers
        model: 'Buyers', // Nombre de la tabla (plural)
        key: 'id' // Clave primaria de la tabla Buyers
      },
      comment: 'ID del comprador'
    },
    event_type: {
      type: DataTypes.ENUM('LOGIN', 'LOGOUT', 'PURCHASE', 'UPDATE_PROFILE', 'OTHER'), // Tipo de dato: ENUM con valores específicos
      allowNull: false, // No permite valores nulos
      comment: 'Tipo de evento'
    },
    event_date: {
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