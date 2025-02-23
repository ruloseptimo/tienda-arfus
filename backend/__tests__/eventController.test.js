// backend/__tests__/eventController.test.js
const eventController = require('../controllers/eventController');
const { BuyerEvent } = require('../models');

// Mock del modelo BuyerEvent
jest.mock('../models', () => ({
    BuyerEvent: {
        create: jest.fn(),
    },
}));

describe('eventController', () => {
    let req, res;
    let originalConsoleError;

    beforeEach(() => {

        // Guardar la función original de console.error
        originalConsoleError = console.error;
        // Mockear console.error para silenciarlo
        console.error = jest.fn();

        req = {
            body: {
                buyerId: 1,
                eventType: 'COMPRA',
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        // Limpiar el mock antes de cada prueba
        BuyerEvent.create.mockClear();
    });

    afterEach(() => {
        // Restaurar la función original de console.error
        console.error = originalConsoleError;
    });

    describe('createBuyerEvent', () => {
        it('debe crear un evento del comprador con éxito', async () => {
            const newEvent = { buyerId: 1, eventType: 'COMPRA', eventDate: new Date() };
            BuyerEvent.create.mockResolvedValue(newEvent);

            await eventController.createBuyerEvent(req, res);

            expect(BuyerEvent.create).toHaveBeenCalledWith({
                buyerId: 1,
                eventType: 'COMPRA',
                eventDate: expect.any(Date), // Verifica que eventDate sea una instancia de Date
            });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(newEvent);
        });

        it('debe manejar errores al crear un evento del comprador', async () => {
            BuyerEvent.create.mockRejectedValue(new Error('Error al crear el evento'));

            await eventController.createBuyerEvent(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'Error al registrar el evento' });
        });
    });
});