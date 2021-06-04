import { FastifyInstance } from 'fastify';

export const helloRoutes = async (fastify: FastifyInstance, options: any) => {
  fastify.get('/', async (request, reply) => {
    return { hello: 'world' };
  });
};
