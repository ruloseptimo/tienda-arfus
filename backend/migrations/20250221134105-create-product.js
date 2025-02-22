'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * Método 'up' que define los cambios a realizar en la base de datos.
   * Se ejecuta al aplicar la migración.
   *
   * @param {import('sequelize').QueryInterface} queryInterface - Objeto para interactuar con la base de datos.
   * @param {import('sequelize').Sequelize} Sequelize - Instancia de Sequelize.
   */
  async up(queryInterface, Sequelize) {
    // Crea la tabla 'Products' en la base de datos.
    await queryInterface.createTable('Products', {
      // Definición de la columna 'id' (clave primaria).
      id: {
        allowNull: false, // No permite valores nulos.
        autoIncrement: true, // Se autoincrementa.
        primaryKey: true, // Es la clave primaria.
        type: Sequelize.INTEGER // Tipo de dato: entero.
      },
      // Definición de la columna 'name'.
      name: {
        type: Sequelize.STRING // Tipo de dato: cadena de texto.
      },
      // Definición de la columna 'description'.
      description: {
        type: Sequelize.TEXT // Tipo de dato: texto largo.
      },
      // Definición de la columna 'price'.
      price: {
        type: Sequelize.FLOAT // Tipo de dato: número decimal de punto flotante.
      },
      // Definición de la columna 'stockQuantity'.
      stockQuantity: {
        type: Sequelize.INTEGER // Tipo de dato: entero.
      },
      // Definición de la columna 'createdAt' (fecha de creación).
      createdAt: {
        allowNull: false, // No permite valores nulos.
        type: Sequelize.DATE // Tipo de dato: fecha y hora.
      },
      // Definición de la columna 'updatedAt' (fecha de última actualización).
      updatedAt: {
        allowNull: false, // No permite valores nulos.
        type: Sequelize.DATE // Tipo de dato: fecha y hora.
      }
    });
  },

  /**
   * Método 'down' que define los cambios para revertir la migración.
   * Se ejecuta al deshacer la migración.
   *
   * @param {import('sequelize').QueryInterface} queryInterface - Objeto para interactuar con la base de datos.
   * @param {import('sequelize').Sequelize} Sequelize - Instancia de Sequelize.
   */
  async down(queryInterface, Sequelize) {
    // Elimina la tabla 'Products' de la base de datos.
    await queryInterface.dropTable('Products');
  }
};