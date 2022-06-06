import { Response } from 'express';
import { FastifyReply } from 'fastify';
import createError, { HttpError, isHttpError } from 'http-errors';
import logger from '../libs/logger';
import { ApiError, IRouteHandler } from '../libs/types';

export default class BaseRouteHandler implements IRouteHandler {
  protected successCode: number = 200;

  protected errorStatusCode: number = 500;

  protected healthCheckResponse = {
    ok: true,
  };

  /**
   * This method handles both internal errors and http errors
   * As long as all layers in the server are wrapped in try-catch, we will be able to throw both types of error from any layer of the code
   * For internal errors, it will respond with obscured 500 'Internal Server Error' but log the detailed error message
   * example: throw Error('Detailed error message');
   * For http errors, it will respond AND log the status and message of your choice.
   * example: throw createError(404, 'Barcode not found');
   */
  errorHandler(reply: FastifyReply | Response, err: ApiError): void {
    let errorMessage: string = 'Internal Server Error';

    let processedError: HttpError;

    if (isHttpError(err)) {
      processedError = err;
      errorMessage = processedError.message;
    } else {
      processedError = createError(500, err);
    }

    const { statusCode, message, stack } = processedError;

    logger.error(`ErrorHandler: [Status: ${statusCode}] [Message: ${typeof message === 'string' ? message : JSON.stringify(message)}] ${`[${stack}]`}`);
    reply.status(statusCode).send({
      ok: false,
      errorMessage,
    });
  }

  get _name() {
    return this.constructor.name;
  }
}
