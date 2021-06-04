import fastify from 'fastify';
import cors from 'fastify-cors';
import swagger from 'fastify-swagger';
import { helloRoutes } from './routes';

const PORT = process.env.PORT ?? 3000;
const ADDRESS = '127.0.0.1';
const swaggerConfig = {};

export const startServer = async (config = { logger: true }) => {
  const server = fastify(config);

  server.register(cors);
  server.register(swagger, swaggerConfig);

  server.register(helloRoutes);

  try {
    await server.listen(PORT, ADDRESS, (err, host) => {
      server.log.info(`Server listening at ${host} 🚀`);
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
