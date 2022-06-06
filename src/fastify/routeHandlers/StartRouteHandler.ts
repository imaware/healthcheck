import { FastifyRequest, FastifyReply } from 'fastify';
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

  handle = async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      await dependenciesAccessor.checkDependencies();
      reply.status(this.successCode).send(this.healthCheckResponse);
    } catch (err) {
      logger.error('Error in StartRouteHandler.handle.');
      this.errorHandler(reply, err as ApiError);
    }
  };
}
