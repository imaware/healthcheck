import { FastifyRequest, FastifyReply } from 'fastify';
import logger from '../../libs/logger';
import BaseRouteHandler from '../../routeHandlers/BaseRouteHandler';
import { ApiError } from '../../libs/types';

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

  handle = (req: FastifyRequest, reply: FastifyReply): void => {
    try {
      reply.status(this.successCode).send(this.healthCheckResponse);
    } catch (err) {
      logger.error('Error in ReadyRouteHandler.handle.');
      this.errorHandler(reply, err as ApiError);
    }
  };
}
