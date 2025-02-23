const request = require('supertest');
const { app, startServer } = require('../server'); // Importa app y startServer
const { Product, sequelize } = require('../models'); // Importa el modelo y la conexión a la BD

describe(' Pruebas de integración - productRoutes', () => {
    let server; // Variable para almacenar la instancia del servidor

    beforeAll(async () => {
        server = app.listen(3000); // Inicia el servidor
        // await sequelize.sync({ force: true }); // Elimina esta línea
    });

    afterAll(async () => {
        await sequelize.close();
        server.close(); // Cierra el servidor
    });

    test('✅ Debe obtener la lista de productos (GET /api/products)', async () => {
        const response = await request(app).get('/api/products');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('✅ Debe crear un nuevo producto (POST /api/products)', async () => {
        const newProduct = {
            name: "Producto de prueba",
            description: "Descripción de prueba",
            price: 100,
            stockQuantity: 10
        };

        const response = await request(app)
            .post('/api/products')
            .send(newProduct)
            .set('Accept', 'application/json');

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe(newProduct.name);
    });

    test('✅ Debe eliminar un producto por ID (DELETE /api/products/:id)', async () => {
        //  Primero, creamos un producto temporal dentro de la transacción
        const product = await Product.create({
            name: "Producto a eliminar",
            description: "Producto temporal",
            price: 50,
            stockQuantity: 5
        });

        console.log("Producto ID:", product.id); // Verifica el ID

        //  Verifica que el producto existe antes de intentar eliminarlo
        const foundProduct = await Product.findByPk(product.id);
        expect(foundProduct).toBeTruthy(); // Verifica que el producto se encontró

        //  Intentamos eliminarlo usando la API
        const response = await request(app).delete(`/api/products/${product.id}`);

        expect(response.status).toBe(204); // No Content
    });
});