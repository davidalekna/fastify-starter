import { RouteSchemaOptions } from 'declarations';
import { FastifyInstance } from 'fastify';
import { ok } from './ok';

const allRoutes: RouteSchemaOptions[] = [ok];

export const routes = async (fastify: FastifyInstance, options: { prefix: string }) => {
  allRoutes.forEach((route) => fastify.route(route));
};
