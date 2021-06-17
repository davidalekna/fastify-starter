import { FastifyInstance, RouteOptions } from 'fastify';
import bearerAuthPlugin from 'fastify-bearer-auth';
import { ok } from './ok';
import { users } from './users';

const allRoutes: RouteOptions[] = [ok, users];

export const routes = async (fastify: FastifyInstance, options: { prefix: string }) => {
  // https://github.com/fastify/fastify-bearer-auth
  fastify.register(bearerAuthPlugin, { keys: new Set(['a-super-secret-key']) });

  allRoutes.forEach((route) => fastify.route(route));
};
