import supertest from 'supertest';
import tap from 'tap';
import { buildFastify } from '../start';

tap.test('GET `/` route', async (t) => {
  const fastify = buildFastify({ logger: false });

  t.teardown(() => {
    fastify.close();
  });

  await fastify.ready();

  const response = await supertest(fastify.server)
    .get('/v1')
    .set({ Authorization: 'Bearer a-super-secret-key', Accept: 'application/json' })
    .expect(200)
    .expect('Content-Type', 'application/json; charset=utf-8');

  t.same(response.body, { ok: 'ok' });
});
