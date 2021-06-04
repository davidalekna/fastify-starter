import fastify from 'fastify';
import cors from 'fastify-cors';
import swagger from 'fastify-swagger';
import { helloRoutes } from './routes';

const swaggerConfig = {};

export const startServer = async ({
  logger = true,
  port = process.env.PORT ?? 5000,
  address = '127.0.0.1',
} = {}) => {
  const server = fastify({ logger });

  server.register(cors);
  server.register(swagger, swaggerConfig);

  server.register(helloRoutes);

  try {
    await server.listen(port, address, (err, host) => {
      server.log.info(`Server listening at ${host} 🚀`);
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
