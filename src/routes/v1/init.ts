import { FastifyInstance } from 'fastify';

export const initRoutes = async (fastify: FastifyInstance, options: { prefix: string }) => {
  fastify.get('/', async (request, reply) => {
    return { ok: 'ok' };
  });
};
