const express = require('express'); // Importa el módulo express para crear rutas.
const { getFilteredProducts, getTransactionReport } = require('../controllers/queryController'); // Importa las funciones controladoras desde el archivo queryController.js.
const router = express.Router(); // Crea una instancia del enrutador de Express.

// Define la ruta GET '/filtered-products' para obtener productos filtrados.
// Cuando se realiza una solicitud GET a /filtered-products, se ejecuta la función getFilteredProducts.
// Esta ruta se utilizará para obtener productos que cumplan ciertos criterios (ej., precio > 50 y stock < 20).
router.get('/filtered-products', getFilteredProducts);

// Define la ruta GET '/transaction-report' para obtener un informe de transacciones.
// Cuando se realiza una solicitud GET a /transaction-report, se ejecuta la función getTransactionReport.
// Esta ruta se utilizará para obtener un informe que incluya datos de transacciones y compradores.
router.get('/transaction-report', getTransactionReport);

module.exports = router; // Exporta el enrutador para que pueda ser utilizado en otros archivos (generalmente en el archivo principal de la aplicación).