const request = require('supertest');
const app = require('../server'); // Importa la app de Express
const { sequelize, Product } = require('../models'); // Importa modelos

describe('API de Productos', () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    test('Debe obtener la lista de productos', async () => {
        await Product.create({ name: 'Producto 1', description: 'Desc', price: 100, stock_quantity: 10 });

        const res = await request(app).get('/api/products');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    test('Debe crear un producto', async () => {
        const res = await request(app).post('/api/products').send({
            name: 'Nuevo Producto',
            description: 'Prueba',
            price: 50,
            stock_quantity: 20
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe('Nuevo Producto');
    });

    test('Debe eliminar un producto', async () => {
        const product = await Product.create({ name: 'Eliminar', description: 'Test', price: 80, stock_quantity: 5 });

        const res = await request(app).delete(`/api/products/${product.id}`);
        expect(res.statusCode).toBe(200);
    });
});
