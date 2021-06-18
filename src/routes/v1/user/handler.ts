import { RouteOptions } from 'fastify';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { listUsers$, listTodos$, UsersSchema } from '../../../sources/jsonplaceholder';

export const listUsers: RouteOptions = {
  method: 'GET',
  url: '/users',
  schema: {
    headers: {
      Authorization: { type: 'string' },
    },
    response: {
      200: {
        items: UsersSchema,
      },
    },
  },
  handler: (request, reply) => {
    const pipeline = combineLatest([listUsers$, listTodos$]).pipe(
      map(([users, todos]) => {
        return {
          items: users.map((user) => ({
            ...user,
            todos: todos.filter((todo) => todo.userId === user.id),
          })),
        };
      }),
    );

    pipeline.subscribe({
      next: (result) => reply.send(result),
      error: (error) => {
        request.log.info(`listUsers error: ${error}`);
        throw new Error('listUsers error: in the response from services');
      },
    });
  },
};
