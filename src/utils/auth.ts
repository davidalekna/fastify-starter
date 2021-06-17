import { FastifyInstance } from 'fastify';
import bearerAuthPlugin, { FastifyBearerAuthOptions } from 'fastify-bearer-auth';

// READ MORE: https://github.com/fastify/fastify-bearer-auth

const defaultOptions: FastifyBearerAuthOptions = {
  keys: new Set(['a-super-secret-key']),
};

export const registerAuth = (fastify: FastifyInstance) => {
  fastify.register(bearerAuthPlugin, defaultOptions);
};
