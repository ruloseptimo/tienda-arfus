const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const productRoutes = require('./routes/productRoutes');
const eventRoutes = require('./routes/eventRoutes');
const queryRoutes = require('./routes/queryRoutes');
const { log } = require('./config/config');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/queries', queryRoutes);

// Función para iniciar el servidor
function startServer() {
    app.listen(PORT, () => {
        console.log(` Servidor corriendo en http://localhost:${PORT}`);
    });
}

// Exportar app y la función para iniciar el servidor
module.exports = { app, startServer };

// Iniciar el servidor solo si este archivo se ejecuta directamente
if (require.main === module) {
    startServer();
}