import { FastifyInstance, RouteOptions } from 'fastify';
import { ok } from './ok';
import { users } from './users';

const allRoutes: RouteOptions[] = [ok, users];

export const routes = async (fastify: FastifyInstance, options: { prefix: string }) => {
  allRoutes.forEach((route) => fastify.route(route));
};
