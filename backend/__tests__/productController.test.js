// backend/__tests__/productController.test.js
const productController = require('../controllers/productController');
const { Product } = require('../models');

// Mock del modelo Product
jest.mock('../models', () => ({
    Product: {
        findAll: jest.fn(),
        create: jest.fn(),
        findByPk: jest.fn(),
        destroy: jest.fn(),
    },
}));

describe('productController', () => {
    let req, res;
    let originalConsoleError; // Variable para almacenar la función original

    beforeEach(() => {
        // Guardar la función original de console.error
        originalConsoleError = console.error;
        // Mockear console.error para silenciarlo
        console.error = jest.fn();

        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            send: jest.fn(),
        };
        // Limpiar los mocks antes de cada prueba
        Product.findAll.mockClear();
        Product.create.mockClear();
        Product.findByPk.mockClear();
        Product.destroy.mockClear();
    });

    afterEach(() => {
        // Restaurar la función original de console.error
        console.error = originalConsoleError;
    });

    describe('getAllProducts', () => {
        it('debe obtener todos los productos', async () => {
            const products = [{ id: 1, name: 'Producto 1' }, { id: 2, name: 'Producto 2' }];
            Product.findAll.mockResolvedValue(products);

            await productController.getAllProducts(req, res);

            expect(Product.findAll).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(products);
        });

        it('debe manejar errores', async () => {
            Product.findAll.mockRejectedValue(new Error('Error al obtener productos'));

            await productController.getAllProducts(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error al obtener productos' });
        });
    });

    describe('createProduct', () => {
        it('debe crear un producto', async () => {
            req.body = { name: 'Nuevo Producto', description: 'Descripción', price: 10, stockQuantity: 100 };
            const newProduct = { id: 3, ...req.body };
            Product.create.mockResolvedValue(newProduct);

            await productController.createProduct(req, res);

            expect(Product.create).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(newProduct);
        });

        it('debe manejar errores', async () => {
            req.body = { name: 'Nuevo Producto', description: 'Descripción', price: 10, stockQuantity: 100 };
            Product.create.mockRejectedValue(new Error('Error al crear el producto'));

            await productController.createProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error al crear el producto' });
        });
    });

    describe('deleteProduct', () => {
        it('debe eliminar un producto', async () => {
            req.params = { id: 1 };
            const product = { id: 1, destroy: jest.fn().mockResolvedValue() };
            Product.findByPk.mockResolvedValue(product);

            await productController.deleteProduct(req, res);

            expect(Product.findByPk).toHaveBeenCalledWith(req.params.id);
            expect(product.destroy).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.send).toHaveBeenCalled();
        });

        it('debe manejar producto no encontrado', async () => {
            req.params = { id: 1 };
            Product.findByPk.mockResolvedValue(null);

            await productController.deleteProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ error: 'Producto no encontrado' });
        });

        it('debe manejar errores', async () => {
            req.params = { id: 1 };
            Product.findByPk.mockRejectedValue(new Error('Error al eliminar el producto'));

            await productController.deleteProduct(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error al eliminar el producto' });
        });
    });
});