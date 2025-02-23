// backend/__tests__/queryService.test.js
const queryService = require('../services/queryService');
const { sequelize } = require('../config/config'); // Asegúrate de que la ruta sea correcta

describe('queryService', () => {
    beforeAll(async () => {
        // Configurar la base de datos de prueba
        await sequelize.sync({ force: true }); // Esto recrea las tablas
        // Insertar datos de prueba en la tabla Products
        await sequelize.query(`INSERT INTO Products (name, description, price, stockQuantity, createdAt, updatedAt) VALUES ('Producto de prueba', 'Descripción de prueba', 60, 10, NOW(), NOW())`);
        //insertar datos de prueba necesarios para la consulta getTransactionReport.
        await sequelize.query(`INSERT INTO Buyers (firstName, lastName, documentId, createdAt, updatedAt) VALUES ('Comprador', 'de prueba', '1234', NOW(), NOW())`);
        await sequelize.query(`INSERT INTO BuyerEvents (buyerId, eventType, eventDate, createdAt, updatedAt) VALUES (1, 'COMPRA', NOW(), NOW(), NOW())`);
        await sequelize.query(`INSERT INTO Transactions (buyerId, buyerEventId, productId, pricePaid, transactionDate, createdAt, updatedAt) VALUES (1, 1, 1, 100, NOW(), NOW(), NOW())`);
    });

    afterAll(async () => {
        // Cerrar la conexión a la base de datos de prueba
        await sequelize.close();
    });

    it('debe obtener productos filtrados correctamente', async () => {
        const products = await queryService.getFilteredProducts();
        expect(products).toBeDefined();
        expect(products.length).toBeGreaterThan(0);
        expect(products[0].price).toBeGreaterThan(50);
        expect(products[0].stockQuantity).toBeLessThan(20);
    });

    it('debe obtener el informe de transacciones correctamente', async () => {
        const report = await queryService.getTransactionReport();
        expect(report).toBeDefined();
        expect(report.length).toBeGreaterThan(0);
        expect(report[0].firstName).toBeDefined();
        // Agrega más aserciones para verificar los datos del informe
        expect(report[0].lastName).toBeDefined();
        expect(report[0].documentId).toBeDefined();
        expect(report[0].transactionId).toBeDefined();
        expect(report[0].pricePaid).toBeDefined();
        expect(report[0].transactionDate).toBeDefined();
        expect(report[0].buyerEventId).toBeDefined();
        expect(report[0].eventType).toBeDefined();
        expect(report[0].eventDate).toBeDefined();
        expect(report[0].productId).toBeDefined();
        expect(report[0].productName).toBeDefined();
        expect(report[0].productDescription).toBeDefined();
        expect(report[0].productPrice).toBeDefined();
    });
});