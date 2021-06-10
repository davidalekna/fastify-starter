import { FastifyInstance, RouteOptions } from 'fastify';
import { ok } from './ok';

const allRoutes: RouteOptions[] = [ok];

export const routes = async (fastify: FastifyInstance, options: { prefix: string }) => {
  allRoutes.forEach((route) => fastify.route(route));
};
