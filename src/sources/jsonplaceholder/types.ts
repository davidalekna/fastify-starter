import { Type, Static } from '@sinclair/typebox';

export const userSchemaConstructor = (overrides = {}) => {
  return Type.Object({
    id: Type.Number(),
    name: Type.String(),
    username: Type.String(),
    company: Type.Object({
      name: Type.String(),
      catchPhrase: Type.String(),
      bs: Type.String(),
    }),
    email: Type.String(),
    phone: Type.String(),
    website: Type.String(),
    address: Type.Object({
      street: Type.String(),
      suite: Type.String(),
      city: Type.String(),
      zipcode: Type.String(),
      geo: Type.Object({
        lat: Type.String(),
        lng: Type.String(),
      }),
    }),
    ...overrides,
  });
};

const UserRecord = userSchemaConstructor();

// typescript types
export type User = Static<typeof UserRecord>;

export const TodoRecord = Type.Object({
  userId: Type.Number(),
  id: Type.Number(),
  title: Type.String(),
  completed: Type.String(),
});

// typescript types
export type Todo = Static<typeof TodoRecord>;

const UserRecordWithTodos = userSchemaConstructor({ todos: Type.Array(TodoRecord) });

// fastify schema
export const UsersSchema = Type.Array(UserRecordWithTodos);
