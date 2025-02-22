const { getFilteredProducts, getTransactionReport } = require('../services/queryService'); // Importa las funciones del servicio queryService.

/**
 * Controlador para obtener productos filtrados.
 * Este controlador maneja la solicitud para obtener productos que cumplen ciertos criterios (ej., precio > 50 y stock < 20).
 * @param {object} req - El objeto de solicitud de Express.
 * @param {object} res - El objeto de respuesta de Express.
 */
exports.getFilteredProducts = async (req, res) => {
    try {
        const products = await getFilteredProducts(); // Llama a la función del servicio para obtener los productos filtrados.
        res.json(products); // Envía la respuesta con los productos filtrados en formato JSON.
    } catch (error) {
        console.error("Error en la consulta de productos:", error); // Imprime el error en la consola para depuración.
        res.status(500).json({ error: 'Error en la consulta de productos' }); // Envía una respuesta con código de estado 500 (Error interno del servidor) y un mensaje de error.
    }
};

/**
 * Controlador para obtener informe de transacciones.
 * Este controlador maneja la solicitud para obtener un informe que incluye datos de transacciones y compradores.
 * @param {object} req - El objeto de solicitud de Express.
 * @param {object} res - El objeto de respuesta de Express.
 */
exports.getTransactionReport = async (req, res) => {
    try {
        const report = await getTransactionReport(); // Llama a la función del servicio para obtener el informe.
        res.json(report); // Envía la respuesta con el informe en formato JSON.
    } catch (error) {
        console.error("Error en la consulta de transacciones:", error); // Imprime el error en la consola para depuración.
        res.status(500).json({ error: 'Error en la consulta de transacciones' }); // Envía una respuesta con código de estado 500 (Error interno del servidor) y un mensaje de error.
    }
};