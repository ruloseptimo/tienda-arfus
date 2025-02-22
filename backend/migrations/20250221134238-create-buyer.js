'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * Método `up` de la migración. Se ejecuta al aplicar la migración.
   *
   * @param {import('sequelize').QueryInterface} queryInterface - Interfaz para ejecutar consultas de modificación de la base de datos.
   * @param {import('sequelize').Sequelize} Sequelize - Instancia de Sequelize.
   * @returns {Promise<void>}
   */
  async up(queryInterface, Sequelize) {
    // Crea la tabla 'Buyers'
    await queryInterface.createTable('Buyers', {
      id: {
        allowNull: false, // No permite valores nulos
        autoIncrement: true, // Se autoincrementa
        primaryKey: true, // Es la clave primaria
        type: Sequelize.INTEGER // Tipo de dato: entero
      },
      firstName: {
        type: Sequelize.STRING // Tipo de dato: cadena de texto
      },
      lastName: {
        type: Sequelize.STRING // Tipo de dato: cadena de texto
      },
      documentId: {
        type: Sequelize.STRING // Tipo de dato: cadena de texto
      },
      documentType: {
        type: Sequelize.STRING // Tipo de dato: cadena de texto
      },
      createdAt: {
        allowNull: false, // No permite valores nulos
        type: Sequelize.DATE // Tipo de dato: fecha y hora
      },
      updatedAt: {
        allowNull: false, // No permite valores nulos
        type: Sequelize.DATE // Tipo de dato: fecha y hora
      }
    });
    // Agrega una restricción de índice único compuesto a la tabla 'Buyers'
    await queryInterface.addConstraint('Buyers', {
      fields: ['documentId', 'documentType'], // Columnas que forman parte del índice único
      type: 'unique', // Tipo de restricción: índice único
      name: 'unique_document_type' // Nombre de la restricción
    });
  },
  /**
   * Método `down` de la migración. Se ejecuta al revertir la migración.
   *
   * @param {import('sequelize').QueryInterface} queryInterface - Interfaz para ejecutar consultas de modificación de la base de datos.
   * @param {import('sequelize').Sequelize} Sequelize - Instancia de Sequelize.
   * @returns {Promise<void>}
   */
  async down(queryInterface, Sequelize) {
    // Elimina la tabla 'Buyers'
    await queryInterface.dropTable('Buyers');
  }
};