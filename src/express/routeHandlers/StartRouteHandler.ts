import { Application, Request, Response } from 'express';
import { dependenciesAccessor } from '../../accessors';
import logger from '../../libs/logger';
import { ApiError } from '../../libs/types';
import BaseRouteHandler from '../../routeHandlers/BaseRouteHandler';

/**
 * Will be hit on startup. Checks if API is up and checks for dependent services like pdf-generator, tracking-api, etc
 *
 * @route /healthcheck/startz
 */
export default class StartRouteHandler extends BaseRouteHandler {
  uri: string = '/healthcheck/startz';

  constructor(app: Application) {
    super();
    app.get(this.uri, this.handle.bind(this));
    logger.verbose(`GET ${this.uri} Constructed`);
  }

  handle = async (req: Request, reply: Response): Promise<void> => {
    try {
      await dependenciesAccessor.checkDependencies();
      reply.status(this.successCode).send(this.healthCheckResponse);
    } catch (err) {
      logger.error('Error in StartRouteHandler.handle.');
      this.errorHandler(reply, err as ApiError);
    }
  };
}
