import { RouteOptions } from 'fastify';

export const ok: RouteOptions = {
  method: 'GET',
  url: '/',
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          ok: { type: 'string' },
        },
      },
    },
  },
  handler: (request, reply) => {
    reply.send({ ok: 'ok' });
  },
};
