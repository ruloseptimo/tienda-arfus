const { BuyerEvent } = require('../models'); // Importa el modelo BuyerEvent desde el archivo models/index.js (o donde lo tengas definido).

/**
 * Crea un evento del comprador.
 * @param {object} req - El objeto de solicitud de Express. Se espera que contenga los datos del evento en req.body (buyer_id, event_type).
 * @param {object} res - El objeto de respuesta de Express.
 */
exports.createBuyerEvent = async (req, res) => {
    try {
        const { buyerId, eventType } = req.body; // Obtiene los datos del evento desde el cuerpo de la solicitud.
        // Crea un nuevo evento del comprador en la base de datos.  Incluye la fecha del evento.
        const newEvent = await BuyerEvent.create({ buyerId, eventType, eventDate: new Date() }); 
        res.status(201).json(newEvent); // Envía el nuevo evento creado en formato JSON como respuesta con código de estado 201 (Creado).
    } catch (error) {
        console.error("Error al registrar el evento:", error); // Imprime el error en la consola para depuración.
        res.status(500).json({ error: 'Error al registrar el evento' }); // Envía una respuesta con código de estado 500 (Error interno del servidor) y un mensaje de error.
    }
};