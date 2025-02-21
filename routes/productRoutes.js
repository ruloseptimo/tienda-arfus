const express = require('express'); // Importa el módulo express para crear rutas.
const { getAllProducts, createProduct, deleteProduct } = require('../controllers/productController'); // Importa las funciones controladoras desde el archivo productController.js.
const router = express.Router(); // Crea una instancia del enrutador de Express.

// Define la ruta GET '/' para obtener todos los productos.
// Cuando se realiza una solicitud GET a la raíz del path de productos, se ejecuta la función getAllProducts.
router.get('/', getAllProducts);

// Define la ruta POST '/' para crear un nuevo producto.
// Cuando se realiza una solicitud POST a la raíz del path de productos, se ejecuta la función createProduct.
router.post('/', createProduct);

// Define la ruta DELETE '/:id' para eliminar un producto por ID.
// Cuando se realiza una solicitud DELETE a un path como /:id (donde :id es un parámetro), se ejecuta la función deleteProduct.
// El valor del parámetro :id estará disponible en req.params.id dentro de la función deleteProduct.
router.delete('/:id', deleteProduct);

module.exports = router; // Exporta el enrutador para que pueda ser utilizado en otros archivos (generalmente en el archivo principal de la aplicación).