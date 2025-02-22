const { faker } = require('@faker-js/faker');
const db = require('../models/index.js');
const { Product, Buyer, Transaction, BuyerEvent } = db;
const sequelize = db.sequelize;

const NUM_PRODUCTS = 2000;
const NUM_BUYERS = 3000;
const NUM_EVENTS = 10000;

const generateData = async () => {
    try {
        if (!sequelize) {
            throw new Error("❌ La instancia de Sequelize no está definida. Revisa config/config.js.");
        }

        console.log(' Sincronizando la base de datos...');
        await sequelize.sync({ force: true });

        console.log('✨ Generando datos de prueba...');

        // Generación de productos
        console.log('⚙️ Generando productos...');
        const products = [];
        for (let i = 0; i < NUM_PRODUCTS; i++) {
            products.push({
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                price: faker.commerce.price(10, 2000, 2),
                stockQuantity: faker.number.int({ min: 1, max: 100 }),
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }
        await Product.bulkCreate(products);

        // Generación de compradores con unicidad de documento y tipo de documento
        console.log(' Generando compradores...');
        const buyers = [];
        const uniqueCombinations = new Set();
        for (let i = 0; i < NUM_BUYERS; i++) {
            let documentId, documentType, combination;
            do {
                documentId = faker.string.uuid();
                documentType = faker.helpers.arrayElement(['DNI', 'Pasaporte']);
                combination = `${documentId}-${documentType}`;
            } while (uniqueCombinations.has(combination));
            uniqueCombinations.add(combination);
            buyers.push({
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                documentId: documentId,
                documentType: documentType,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }
        await Buyer.bulkCreate(buyers);

        // Generación de eventos de compradores
        console.log(' Generando eventos de compradores...');
        const events = [];
        for (let i = 0; i < NUM_EVENTS; i++) {
            events.push({
                buyerId: faker.number.int({ min: 1, max: NUM_BUYERS }),
                eventType: faker.helpers.arrayElement(['COMPRA', 'DEVOLUCIÓN', 'VISITA', 'CONSULTA DE DATOS', 'ACTUALIZACIÓN DE DATOS', 'DESCARGA DE FACTURAS']),
                eventDate: faker.date.recent(),
                details: faker.lorem.sentence(),
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }
        await BuyerEvent.bulkCreate(events);

        // Generación de transacciones solo para eventos de compra
        console.log(' Generando transacciones...');
        const purchaseEvents = await BuyerEvent.findAll({ where: { eventType: 'COMPRA' } });
        const transactions = [];

        for (const event of purchaseEvents) {
            transactions.push({
                buyerId: event.buyerId,
                productId: faker.number.int({ min: 1, max: NUM_PRODUCTS }),
                pricePaid: faker.commerce.price(10, 2000, 2),
                tax: faker.number.float({ min: 0.05, max: 0.25 }),
                transactionDate: faker.date.past(),
                buyerEventId: event.id,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }
        await Transaction.bulkCreate(transactions);

        console.log('✅ Base de datos poblada con éxito.');

        process.exit();
    } catch (error) {
        console.error('❌ Error llenando la base de datos:', error);
        process.exit(1);
    }
};

generateData();