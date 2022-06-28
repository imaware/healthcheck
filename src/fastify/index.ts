import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { Routes } from './routes';

export const fastifyHealthcheck = fp(async (app: FastifyInstance) => {
  for (const route of Routes) {
    // eslint-disable-next-line no-await-in-loop
    await app.register(route);
  }
});
