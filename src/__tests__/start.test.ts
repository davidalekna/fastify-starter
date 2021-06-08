import tap from 'tap';
// import { FastifyInstance } from 'fastify';
import { startServer } from '../start';

tap.test('startServer', async (t) => {
  t.plan(4);

  const fastify = await startServer({ logger: false });

  t.teardown(async () => (await fastify.close()) as any);

  await fastify.ready();

  fastify.inject(
    {
      method: 'GET',
      url: '/',
    },
    (err, response) => {
      t.error(err);
      t.equal(response.statusCode, 200);
      t.equal(response.headers['content-type'], 'application/json; charset=utf-8');
      t.same(response.json(), { hello: 'world' });
    },
  );
});
