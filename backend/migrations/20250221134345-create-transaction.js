'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Crea la tabla 'Transactions'
    await queryInterface.createTable('Transactions', {
      id: {
        // ID de la transacción (clave primaria, autoincremental)
        allowNull: false, // No permite valores nulos
        autoIncrement: true, // Autoincremental
        primaryKey: true, // Clave primaria
        type: Sequelize.INTEGER // Tipo de dato: entero
      },
      buyerId: {
        // ID del comprador (clave foránea)
        type: Sequelize.INTEGER // Tipo de dato: entero
      },
      productId: {
        // ID del producto (clave foránea)
        type: Sequelize.INTEGER // Tipo de dato: entero
      },
      pricePaid: {
        // Precio pagado por la transacción
        type: Sequelize.FLOAT // Tipo de dato: número decimal (float)
      },
      tax: {
        // Impuesto de la transacción
        type: Sequelize.FLOAT // Tipo de dato: número decimal (float)
      },
      transactionDate: {
        // Fecha y hora de la transacción
        type: Sequelize.DATE // Tipo de dato: fecha y hora
      },
      buyerEventId: {
        // ID del evento de comprador relacionado (clave foránea)
        type: Sequelize.INTEGER, // Tipo de dato: entero
        allowNull: false, // No permite valores nulos
        references: {
            model: 'Buyerevents', // Tabla referenciada: Buyerevents
            key: 'id' // Clave primaria de la tabla referenciada
        },
        onUpdate: 'CASCADE', // Actualiza la clave foránea si se actualiza la clave primaria en la tabla referenciada
        onDelete: 'CASCADE' // Elimina la clave foránea si se elimina la clave primaria en la tabla referenciada
      },
      createdAt: {
        // Fecha y hora de creación del registro
        allowNull: false, // No permite valores nulos
        type: Sequelize.DATE // Tipo de dato: fecha y hora
      },
      updatedAt: {
        // Fecha y hora de última actualización del registro
        allowNull: false, // No permite valores nulos
        type: Sequelize.DATE // Tipo de dato: fecha y hora
      }
    });
  },
  async down(queryInterface, Sequelize) {
    // Elimina la tabla 'Transactions'
    await queryInterface.dropTable('Transactions');
  }
};