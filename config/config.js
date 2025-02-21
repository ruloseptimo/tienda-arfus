require('dotenv').config();

const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';

const configurations = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'shop-arfus',
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
    use_env_variable: process.env.USE_ENV_VARIABLE || true
  },
  test: {
    // ... configuración para test
    use_env_variable: false
  },
  production: {
    // ... configuración para producción
    use_env_variable: true
  }
};

const config = configurations[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexión a la base de datos establecida correctamente.');
  })
  .catch(err => {
    console.error('❌ Error al conectar a la base de datos:', err);
  });

module.exports = { sequelize, configurations };