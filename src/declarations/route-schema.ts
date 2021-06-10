import { FastifySchema, RouteOptions } from 'fastify';
import { RouteGenericInterface } from 'fastify/types/route';
import { IncomingMessage, Server, ServerResponse } from 'http';

export type RouteSchemaOptions = RouteOptions<
  Server,
  IncomingMessage,
  ServerResponse,
  RouteGenericInterface,
  unknown,
  FastifySchema
>;
