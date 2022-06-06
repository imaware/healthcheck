/* eslint-disable no-unused-vars */
import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpError } from 'http-errors';

export type ApiError = HttpError | Error;

export interface IRouteHandler {
  handle?(req: FastifyRequest, reply: FastifyReply): void;
  errorHandler(reply: FastifyReply, err: Error, statusCode: number): void;
}

export interface HealthcheckDependencies {
  [key: string]: string;
}
