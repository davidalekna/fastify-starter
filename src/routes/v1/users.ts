import { RouteOptions } from 'fastify';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { listUsers$, listTodos$ } from '../../sources/jsonplaceholder';

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
    const usersPipeline = combineLatest([listUsers$, listTodos$]).pipe(
      map(([users, todos]) => {
        return users.map((user) => ({
          ...user,
          todos: todos.filter((todo) => todo.userId === user.id),
        }));
      }),
    );

    usersPipeline.subscribe({
      next: (result) => reply.send(result),
      error: (error) => {
        request.log.info(`Error: ${error}`);
        reply.status(401);
        throw new Error('error in the response from services');
      },
    });
  },
};
