/* eslint-disable dot-notation */
import { FastifyInstance } from 'fastify';
import { Application } from 'express';
import { fastifyHealthcheck } from './fastify';
import { expressHealthcheck } from './express';
import { dependenciesAccessor } from './accessors';
import { HealthcheckOptions } from './libs/types';

export const healthcheck = (app: FastifyInstance | Application, options: HealthcheckOptions = {}) => {
  // set dependencies
  dependenciesAccessor.setDependencies(options?.dependencies || {});

  if ((app as unknown as FastifyInstance).addHook !== undefined) {
    fastifyHealthcheck(app as FastifyInstance, {});
  } else if ((app as unknown as Application).engine !== undefined) {
    expressHealthcheck(app as Application);
  } else {
    throw new Error('Healthcheck server must be instance of Fastify or Express.');
  }
};
