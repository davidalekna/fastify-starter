import { RouteOptions } from 'fastify';
import { users$ } from '../../sources/jsonplaceholder';

// todo add address object and company object to the response scheme

export const users: RouteOptions = {
  method: 'GET',
  url: '/users',
  schema: {
    response: {
      200: {
        type: 'array',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          username: { type: 'string' },
          email: { type: 'string' },
          phone: { type: 'string' },
          website: { type: 'string' },
        },
      },
    },
  },
  handler: (request, reply) => {
    users$.subscribe((result) => reply.send(result));
  },
};
