import { FastifyInstance, RouteOptions } from 'fastify';
import { registerAuth } from '../../utils/auth';
import { ok } from './ok';
import { users } from './users';

const allRoutes: RouteOptions[] = [ok, users];

export const routes = async (fastify: FastifyInstance) => {
  registerAuth(fastify);
  allRoutes.forEach((route) => fastify.route(route));
};
