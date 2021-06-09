import { FastifyInstance } from 'fastify';

export const registerRoutes = async (fastify: FastifyInstance, options: { prefix: string }) => {
  fastify.get('/', async (request, reply) => {
    return { ok: 'ok' };
  });
};
