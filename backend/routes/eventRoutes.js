const express = require('express'); // Importa el módulo express para crear rutas.
const { createBuyerEvent } = require('../controllers/eventController'); // Importa la función controladora createBuyerEvent desde el archivo eventController.js.
const router = express.Router(); // Crea una instancia del enrutador de Express.

// Define la ruta POST '/' para crear un nuevo evento del comprador.
// Cuando se realiza una solicitud POST a la raíz del path de eventos, se ejecuta la función createBuyerEvent.
// Esta ruta se utilizará para registrar eventos relacionados con un comprador (por ejemplo, inicio de sesión, compra, etc.).
router.post('/', createBuyerEvent);

module.exports = router; // Exporta el enrutador para que pueda ser utilizado en otros archivos (generalmente en el archivo principal de la aplicación).