const { Sequelize } = require('sequelize');

module.exports = {
    development: {
        username: 'root',
        password: '',
        database: 'shop-arfus',
        host: 'localhost',
        dialect: 'mysql',
        logging: false,
    },
};

const config = module.exports.development;

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

sequelize
    .authenticate()
    .then(() => {
        console.log('✅ Conexión a la base de datos establecida correctamente.');
    })
    .catch((err) => {
        console.error('❌ Error al conectar a la base de datos:', err);
    });

module.exports.sequelize = sequelize; // Exporta la instancia de sequelize