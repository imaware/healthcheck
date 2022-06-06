import { Application, Request, Response } from 'express';
import logger from '../../libs/logger';
import { ApiError } from '../../libs/types';
import BaseRouteHandler from '../../routeHandlers/BaseRouteHandler';

/**
 * Will be constantly hit.
 * Checks for 2xx response bare minimum to see if API is up
 * Support of old healthcheck route `/healthcheck`
 *
 * @route /healthcheck/ready
 * @route /healthcheck
 */
export default class ReadyRouteHandler extends BaseRouteHandler {
  uri: string = '/healthcheck/readyz';

  uri2: string = '/healthcheck';

  constructor(app: Application) {
    super();
    app.get(this.uri, this.handle.bind(this));
    logger.verbose(`GET ${this.uri} Constructed`);
    app.get(this.uri2, this.handle.bind(this));
    logger.verbose(`GET ${this.uri2} Constructed`);
  }

  handle = (req: Request, reply: Response): void => {
    try {
      reply.status(this.successCode).send(this.healthCheckResponse);
    } catch (err) {
      logger.error('Error in ReadyRouteHandler.handle.');
      this.errorHandler(reply, err as ApiError);
    }
  };
}
