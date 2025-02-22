const { QueryTypes } = require('sequelize'); // Importa el objeto QueryTypes de Sequelize para especificar el tipo de consulta.
const { sequelize } = require('../config/config.js'); // Importa la instancia de Sequelize configurada en el archivo database.js.

/**
 * Obtiene productos con precio mayor a 50 y stock menor a 20.
 * @returns {Promise<Array>} Una promesa que resuelve a un array de objetos, donde cada objeto representa un producto que cumple con los criterios de filtrado.
 */
exports.getFilteredProducts = async () => {
    return await sequelize.query(
        `SELECT * FROM Products WHERE price > 50 AND stockQuantity < 20`, // Consulta SQL para seleccionar productos con precio > 50 y stock < 20.
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
            b.firstName, b.lastName, b.documentId,  -- Selecciona nombre, apellido y documento del comprador.
            t.id AS transactionId, t.pricePaid, t.transactionDate, -- Selecciona ID, precio pagado y fecha de la transacción.
            t.buyerEventId, e.eventType, e.eventDate, -- Selecciona ID, tipo y fecha del evento.
            p.id AS productId, p.name AS productName, p.description AS productDescription, p.price AS productPrice -- Datos del producto
        FROM Transactions t  -- Desde la tabla Transactions (alias t).
        JOIN Buyers b ON t.buyerId = b.id  -- Une con la tabla Buyers (alias b) usando la clave foránea buyer_id.
        JOIN BuyerEvents e ON t.buyerEventId = e.id AND e.eventType = 'COMPRA' -- Une con la tabla BuyerEvents (alias e) usando buyer_id y filtrando por tipo de evento 'PURCHASE'.
        JOIN Products p ON t.productId = p.id; -- Unión con la tabla Products
        `,
        { type: QueryTypes.SELECT } // Especifica que la consulta es de tipo SELECT.
    );
};