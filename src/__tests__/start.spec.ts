import { FastifyInstance } from 'fastify';
import { startServer } from '../start';

describe('startServer', () => {
  let server: FastifyInstance = undefined as any;

  beforeAll(async () => {
    server = await startServer({ logger: false });
  });

  afterAll(async () => {
    await server.close();
    server.server.unref();
    console.log('server instance closed');
  });

  test('requests the "/" route', async (t) => {
    const response = await server.inject({
      method: 'GET',
      url: '/',
    });

    expect(response.statusCode).toEqual(200);
  });
});
