import { RouteOptions } from 'fastify';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { listUsers$, listTodos$, UsersSchema } from '../../../sources/jsonplaceholder';

// NOTE: there is a way to have a unified fastify + typescript type using this library
// https://www.npmjs.com/package/@sinclair/typebox

export const listUsers: RouteOptions = {
  method: 'GET',
  url: '/users',
  schema: {
    response: {
      200: UsersSchema,
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
        reply.status(403);
        throw new Error('error in the response from services');
      },
    });
  },
};
