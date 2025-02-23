// backend/__tests__/queryController.test.js
const queryController = require('../controllers/queryController');
const queryService = require('../services/queryService');

// Mock del servicio queryService
jest.mock('../services/queryService', () => ({
    getFilteredProducts: jest.fn(),
    getTransactionReport: jest.fn(),
}));

describe('queryController', () => {
    let req, res;

    beforeEach(() => {
        // Guardar la función original de console.error
        originalConsoleError = console.error;
        // Mockear console.error para silenciarlo
        console.error = jest.fn();

        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        // Limpiar los mocks antes de cada prueba
        queryService.getFilteredProducts.mockClear();
        queryService.getTransactionReport.mockClear();
    });

    afterEach(() => {
        // Restaurar la función original de console.error
        console.error = originalConsoleError;
    });

    describe('getFilteredProducts', () => {
        it('debe obtener productos filtrados con éxito', async () => {
            const products = [{ id: 1, name: 'Producto 1' }, { id: 2, name: 'Producto 2' }];
            queryService.getFilteredProducts.mockResolvedValue(products);

            await queryController.getFilteredProducts(req, res);

            expect(queryService.getFilteredProducts).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(products);
        });

        it('debe manejar errores al obtener productos filtrados', async () => {
            queryService.getFilteredProducts.mockRejectedValue(new Error('Error al obtener productos filtrados'));

            await queryController.getFilteredProducts(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error en la consulta de productos' });
        });
    });

    describe('getTransactionReport', () => {
        it('debe obtener informe de transacciones con éxito', async () => {
            const report = [{ transactionId: 1, buyerName: 'Comprador 1' }, { transactionId: 2, buyerName: 'Comprador 2' }];
            queryService.getTransactionReport.mockResolvedValue(report);

            await queryController.getTransactionReport(req, res);

            expect(queryService.getTransactionReport).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(report);
        });

        it('debe manejar errores al obtener informe de transacciones', async () => {
            queryService.getTransactionReport.mockRejectedValue(new Error('Error al obtener informe de transacciones'));

            await queryController.getTransactionReport(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error en la consulta de transacciones' });
        });
    });
});