import fastify from 'fastify';
import cors from 'fastify-cors';
import swagger from 'fastify-swagger';

const PORT = process.env.PORT ?? 3000;
const ADDRESS = '';
const swaggerConfig = {};

export const startServer = async (config = { logger: true }) => {
  const server = fastify(config);

  server.register(cors);
  server.register(swagger, swaggerConfig);

  server.get('/', async (request, reply) => {
    return { hello: 'world2' };
  });

  try {
    await server.listen(PORT, ADDRESS, (err, host) => {
      server.log.info(`Server listening at ${host}`);
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
