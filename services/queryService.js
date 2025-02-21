const { QueryTypes } = require('sequelize'); // Importa el objeto QueryTypes de Sequelize para especificar el tipo de consulta.
const { sequelize } = require('../config/config.js'); // Importa la instancia de Sequelize configurada en el archivo database.js.

/**
 * Obtiene productos con precio mayor a 50 y stock menor a 20.
 * @returns {Promise<Array>} Una promesa que resuelve a un array de objetos, donde cada objeto representa un producto que cumple con los criterios de filtrado.
 */
exports.getFilteredProducts = async () => {
    return await sequelize.query(
        `SELECT * FROM Products WHERE price > 50 AND stock_quantity < 20`, // Consulta SQL para seleccionar productos con precio > 50 y stock < 20.
        { type: QueryTypes.SELECT } // Especifica que la consulta es de tipo SELECT (para obtener resultados).
    );
};

/**
 * Obtiene un informe de transacciones con datos del comprador y el evento de compra asociado.
 * @returns {Promise<Array>} Una promesa que resuelve a un array de objetos, donde cada objeto representa una transacción con datos del comprador y el evento de compra.
 */
exports.getTransactionReport = async () => {
    return await sequelize.query(
        `SELECT
            b.first_name, b.last_name, b.document_id,  -- Selecciona nombre, apellido y documento del comprador.
            t.id AS transaction_id, t.price_paid, t.transaction_date, -- Selecciona ID, precio pagado y fecha de la transacción.
            e.id AS event_id, e.event_type, e.event_date -- Selecciona ID, tipo y fecha del evento.
        FROM Transactions t  -- Desde la tabla Transactions (alias t).
        JOIN Buyers b ON t.buyer_id = b.id  -- Une con la tabla Buyers (alias b) usando la clave foránea buyer_id.
        LEFT JOIN BuyerEvents e ON t.buyer_id = e.buyer_id AND e.event_type = 'PURCHASE' -- Une opcionalmente con la tabla BuyerEvents (alias e) usando buyer_id y filtrando por tipo de evento 'PURCHASE'.
        `,
        { type: QueryTypes.SELECT } // Especifica que la consulta es de tipo SELECT.
    );
};