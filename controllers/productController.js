const { Product } = require('../models'); // Importa el modelo Product desde el archivo models/index.js (o donde lo tengas definido).

/**
 * Obtiene la lista completa de productos.
 * @param {object} req - El objeto de solicitud de Express.
 * @param {object} res - El objeto de respuesta de Express.
 */
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll(); // Busca todos los productos en la base de datos.
        res.json(products); // Envía la lista de productos en formato JSON como respuesta.
    } catch (error) {
        console.error("Error al obtener productos:", error); // Imprime el error en la consola para depuración.
        res.status(500).json({ error: 'Error al obtener productos' }); // Envía una respuesta con código de estado 500 (Error interno del servidor) y un mensaje de error.
    }
};

/**
 * Crea un nuevo producto.
 * @param {object} req - El objeto de solicitud de Express.  Se espera que contenga los datos del nuevo producto en req.body.
 * @param {object} res - El objeto de respuesta de Express.
 */
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, stock_quantity } = req.body; // Obtiene los datos del producto desde el cuerpo de la solicitud.
        const newProduct = await Product.create({ name, description, price, stock_quantity }); // Crea un nuevo producto en la base de datos.
        res.status(201).json(newProduct); // Envía el nuevo producto creado en formato JSON como respuesta con código de estado 201 (Creado).
    } catch (error) {
        console.error("Error al crear el producto:", error); // Imprime el error en la consola para depuración.
        res.status(500).json({ error: 'Error al crear el producto' }); // Envía una respuesta con código de estado 500 (Error interno del servidor) y un mensaje de error.
    }
};

/**
 * Elimina un producto por ID.
 * @param {object} req - El objeto de solicitud de Express. Se espera que el ID del producto a eliminar esté en req.params.id.
 * @param {object} res - El objeto de respuesta de Express.
 */
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params; // Obtiene el ID del producto desde los parámetros de la ruta.
        const product = await Product.findByPk(id); // Busca el producto por su ID en la base de datos.
        if (!product) return res.status(404).json({ error: 'Producto no encontrado' }); // Si el producto no existe, envía una respuesta con código de estado 404 (No encontrado).

        await product.destroy(); // Elimina el producto de la base de datos.
        res.status(204).send(); // Envía una respuesta con código de estado 204 (Sin contenido) indicando que la eliminación fue exitosa.  No se envía contenido en el cuerpo de la respuesta.
    } catch (error) {
        console.error("Error al eliminar el producto:", error); // Imprime el error en la consola para depuración.
        res.status(500).json({ error: 'Error al eliminar el producto' }); // Envía una respuesta con código de estado 500 (Error interno del servidor) y un mensaje de error.
    }
};