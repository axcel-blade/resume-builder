import { configureCORS } from '../common/cors';

describe('configureCORS', () => {
  it('enables CORS with the Vite origins and credentialed methods', () => {
    const app = { enableCors: jest.fn() };

    configureCORS(app as any);

    expect(app.enableCors).toHaveBeenCalledWith(
      expect.objectContaining({
        origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
      }),
    );
  });
});
