const { faker } = require('@faker-js/faker');
const db = require('../models/index.js'); // Importa el objeto db
const { Product, Buyer, Transaction, BuyerEvent } = db; // Destructura los modelos
const sequelize = db.sequelize; // Obtén la instancia de Sequelize

const NUM_PRODUCTS = 2000;
const NUM_BUYERS = 3000;
const NUM_TRANSACTIONS = 5000;
const NUM_EVENTS = 2000;

const generateData = async () => {
  try {
    // Verifica que sequelize esté definido antes de usarlo
    if (!sequelize) {
      throw new Error("❌ La instancia de Sequelize no está definida. Revisa config/config.js.");
    }

    console.log(' Sincronizando la base de datos...');
    await sequelize.sync({ force: true }); // ¡Usa sequelize desde db!

    console.log('✨ Generando datos de prueba...');

    // Generación de productos
    console.log('⚙️ Generando productos...');
    const products = [];
    for (let i = 0; i < NUM_PRODUCTS; i++) {
      products.push({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(10, 2000, 2),
        stock_quantity: faker.number.int({ min: 1, max: 100 }),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await Product.bulkCreate(products);

    // Generación de compradores
    console.log(' Generando compradores...');
    const buyers = [];
    for (let i = 0; i < NUM_BUYERS; i++) {
      buyers.push({
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        document_id: faker.string.uuid(),
        document_type: faker.helpers.arrayElement(['DNI', 'Pasaporte']),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await Buyer.bulkCreate(buyers);

    // Generación de transacciones
    console.log(' Generando transacciones...');
    const transactions = [];
    for (let i = 0; i < NUM_TRANSACTIONS; i++) {
      transactions.push({
        buyer_id: faker.number.int({ min: 1, max: NUM_BUYERS }),
        product_id: faker.number.int({ min: 1, max: NUM_PRODUCTS }),
        price_paid: faker.commerce.price(10, 2000, 2),
        tax: faker.number.float({ min: 0.05, max: 0.25 }),
        transaction_date: faker.date.past(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await Transaction.bulkCreate(transactions);

    // Generación de eventos de compradores
    console.log(' Generando eventos de compradores...');
    const events = [];
    for (let i = 0; i < NUM_EVENTS; i++) {
      events.push({
        buyer_id: faker.number.int({ min: 1, max: NUM_BUYERS }),
        event_type: faker.helpers.arrayElement(['PURCHASE', 'REFUND', 'VISIT', 'DATA_CONSULTATION', 'DATA_UPDATE', 'INVOICE_DOWNLOAD']),
        event_date: faker.date.recent(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await BuyerEvent.bulkCreate(events);

    console.log('✅ Base de datos poblada con éxito.');

    process.exit(); // Cierra el proceso
  } catch (error) {
    console.error('❌ Error llenando la base de datos:', error);
    process.exit(1);
  }
};

generateData(); // ¡Ejecuta la función!