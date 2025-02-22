'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {  // Función 'up' para crear la tabla
    try { // Bloque try-catch para manejar errores
      await queryInterface.createTable('BuyerEvents', { // Crea la tabla 'BuyerEvents'
        id: { // Columna 'id'
          allowNull: false, // No permite valores nulos
          autoIncrement: true, // Se incrementa automáticamente
          primaryKey: true, // Es la clave primaria
          type: Sequelize.INTEGER // Tipo de dato: entero
        },
        buyerId: { // Columna 'buyerId' (clave foránea)
          type: Sequelize.INTEGER, // Tipo de dato: entero
          allowNull: false, // No permite valores nulos
          references: { // Referencia a la tabla 'Buyers'
            model: 'Buyers', // Nombre de la tabla referenciada (¡en plural!)
            key: 'id' // Clave primaria de la tabla referenciada
          },
          comment: 'ID del comprador' // Comentario (opcional)
        },
        eventType: { // Columna 'eventType' (ENUM)
          type: Sequelize.ENUM('COMPRA', 'DEVOLUCIÓN', 'VISITA', 'CONSULTA DE DATOS', 'ACTUALIZACIÓN DE DATOS', 'DESCARGA DE FACTURAS'), // Valores del ENUM
          allowNull: false, // No permite valores nulos
          comment: 'Tipo de evento' // Comentario (opcional)
        },
        eventDate: { // Columna 'eventDate'
          type: Sequelize.DATE, // Tipo de dato: fecha y hora
          allowNull: false, // No permite valores nulos
          defaultValue: Sequelize.NOW, // Valor por defecto: fecha y hora actual
          comment: 'Fecha y hora del evento' // Comentario (opcional)
        },
        createdAt: { // Columna 'createdAt' (timestamps)
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: { // Columna 'updatedAt' (timestamps)
          allowNull: false,
          type: Sequelize.DATE
        }
      });
    } catch (error) { // Manejo de errores
      console.error("Error en la migración:", error); // Imprime el error en la consola
      throw error; // Lanza el error para que Sequelize lo detecte
    }
  },

  async down (queryInterface, Sequelize) { // Función 'down' para deshacer la migración
    await queryInterface.dropTable('BuyerEvents'); // Elimina la tabla 'BuyerEvents'
  }
};