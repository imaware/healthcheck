/* eslint-disable no-unused-vars */
import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpError } from 'http-errors';

export type ApiError = HttpError | Error;

export interface HealthCheckDependencies {
  [key: string]: string;
}

export interface HealthcheckOptions {
  dependencies?: HealthCheckDependencies;
}
