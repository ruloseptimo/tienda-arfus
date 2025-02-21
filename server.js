// Importa el módulo dotenv para cargar variables de entorno desde un archivo .env (si existe).
require('dotenv').config();

// Importa el framework Express para crear el servidor web.
const express = require('express');

// Importa el middleware CORS para habilitar solicitudes de origen cruzado (Cross-Origin Resource Sharing).
const cors = require('cors');

// Importa las rutas para productos.
const productRoutes = require('./routes/productRoutes');

// Importa las rutas para eventos.
const eventRoutes = require('./routes/eventRoutes');

// Importa las rutas para consultas (queries).
const queryRoutes = require('./routes/queryRoutes'); // Nueva línea: Importa las rutas para consultas.

// Crea una instancia de la aplicación Express.
const app = express();

// Define el puerto en el que el servidor escuchará. Usa la variable de entorno PORT si está definida, sino usa 3000.
const PORT = process.env.PORT || 3000;

// Usa el middleware CORS para habilitar CORS en todas las rutas.
app.use(cors());

// Usa el middleware express.json() para parsear el cuerpo de las solicitudes HTTP en formato JSON.
app.use(express.json()); // Habilita el análisis de JSON en las solicitudes

// Monta las rutas de productos bajo el path /api/products.
app.use('/api/products', productRoutes);

// Monta las rutas de eventos bajo el path /api/events.
app.use('/api/events', eventRoutes);

// Monta las rutas de consultas (queries) bajo el path /api/queries.
app.use('/api/queries', queryRoutes); // Nueva línea: Monta las rutas para consultas.

// Inicia el servidor y escucha en el puerto especificado.
app.listen(PORT, () => {
    // Imprime un mensaje en la consola indicando que el servidor está corriendo.
    console.log(` Servidor corriendo en http://localhost:${PORT}`);
});