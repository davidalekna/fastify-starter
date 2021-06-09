import fastify, { FastifyInstance } from 'fastify';
import cors from 'fastify-cors';
import swagger from 'fastify-swagger';
import swaggerConfig from './configs/swagger.config.json';
import { helloRoutes } from './routes';

export const buildFastify = ({ logger = true } = {}): FastifyInstance => {
  const server: FastifyInstance = fastify({ logger });

  server.register(cors);
  server.register(swagger, swaggerConfig);

  server.get('/v1/openapi3.json', { schema: { hide: true } }, (request, reply) => {
    reply.redirect('/docs/json');
  });

  server.register(helloRoutes);

  return server;
};

export const startServer = async ({
  logger = true,
  port = process.env.PORT ?? 5000,
} = {}): Promise<FastifyInstance> => {
  const server = buildFastify({ logger });

  try {
    await server.listen(port);

    return server;
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
