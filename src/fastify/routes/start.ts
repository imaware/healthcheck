import { FastifyInstance } from 'fastify';
import logger from '../../libs/logger';
import { startRouteHandler } from '../routeHandlers';

export default async function healthCheck(app: FastifyInstance) {
  app.get(startRouteHandler.uri, startRouteHandler.handle);
  logger.verbose(`Initialization: GET ${startRouteHandler.uri} constructed`);
}
