import { FastifyInstance, RouteOptions } from 'fastify';
import { registerAuth } from '../../utils/auth';
import { ok } from './ok';
import { listUsers } from './user';

const allRoutes: RouteOptions[] = [ok, listUsers];

export const routes = async (fastify: FastifyInstance) => {
  registerAuth(fastify);
  allRoutes.forEach((route) => fastify.route(route));
};
