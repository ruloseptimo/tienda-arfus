'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

// Importa la configuración de la base de datos
const config = require(__dirname + '/../config/config.js')[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname) // Lee todos los archivos en el directorio actual
  .filter(file => { // Filtra los archivos que son archivos JavaScript de modelos
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => { // Importa cada archivo de modelo
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model; // Agrega el modelo al objeto db
  });

Object.keys(db).forEach(modelName => { // Itera sobre los modelos
  if (db[modelName].associate) { // Si el modelo tiene asociaciones
    db[modelName].associate(db); // Llama a la función associate del modelo
  }
});

db.sequelize = sequelize; // Agrega la instancia de Sequelize al objeto db
db.Sequelize = Sequelize; // Agrega el objeto Sequelize al objeto db

module.exports = db; // ¡Exporta el objeto db!
