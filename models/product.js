'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      // Un producto puede tener muchas transacciones
      Product.hasMany(models.Transaction, { 
        foreignKey: 'product_id', // Clave foránea en la tabla Transactions
        as: 'transactions' // Alias para acceder a las transacciones del producto
      });
    }
  }

  Product.init({
    name: {
      type: DataTypes.STRING, // Tipo de dato: cadena de texto
      allowNull: false, // No permite valores nulos
      comment: 'Nombre del producto' // Comentario para la base de datos (opcional)
    },
    description: {
      type: DataTypes.TEXT, // Tipo de dato: texto largo
      allowNull: false, // No permite valores nulos
      comment: 'Descripción del producto'
    },
    price: {
      type: DataTypes.FLOAT, // Tipo de dato: número decimal
      allowNull: false, // No permite valores nulos
      validate: { // Validaciones para el precio
        isFloat: true, // Debe ser un número decimal
        min: 0 // No puede ser negativo
      },
      comment: 'Precio del producto'
    },
    stock_quantity: {
      type: DataTypes.INTEGER, // Tipo de dato: número entero
      allowNull: false, // No permite valores nulos
      validate: { // Validaciones para la cantidad en stock
        isInt: true, // Debe ser un número entero
        min: 0 // No puede ser negativo
      },
      comment: 'Cantidad en stock del producto'
    }
  }, {
    sequelize,
    modelName: 'Product', // Nombre del modelo
    tableName: 'Products', // Nombre de la tabla en la base de datos (plural)
    comment: 'Tabla de productos' // Comentario para la base de datos (opcional)
  });

  return Product;
};