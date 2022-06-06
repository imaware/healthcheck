import Fastify, { FastifyInstance } from 'fastify';
import { Routes } from '../../fastify/routes';

describe('Route GET /healthcheck', () => {
  let app: FastifyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    app = Fastify();
    for (const route of Routes) {
      app.register(route);
    }
  });

  it('provides a /healthCheck response', async () => {
    const reply = await app.inject({
      method: 'GET',
      url: '/healthcheck',
    });

    expect(reply.statusCode).toBe(200);
    expect(reply.body).toEqual(JSON.stringify({ ok: true }));
  });

  it('provides a /healthCheck/readyz response', async () => {
    const reply = await app.inject({
      method: 'GET',
      url: '/healthcheck/readyz',
    });

    expect(reply.statusCode).toBe(200);
    expect(reply.body).toEqual(JSON.stringify({ ok: true }));
  });

  it('provides a /healthCheck/startz response', async () => {
    const reply = await app.inject({
      method: 'GET',
      url: '/healthcheck/startz',
    });

    expect(reply.statusCode).toBe(200);
    expect(reply.body).toEqual(JSON.stringify({ ok: true }));
  });
});
