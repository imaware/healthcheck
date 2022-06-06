import { FastifyInstance } from 'fastify';
import logger from '../../libs/logger';
import { readyRouteHandler } from '../routeHandlers';

export default async function healthCheck(app: FastifyInstance) {
  app.get(readyRouteHandler.uri, readyRouteHandler.handle);
  logger.verbose(`Initialization: GET ${readyRouteHandler.uri} constructed`);
  app.get(readyRouteHandler.uri2, readyRouteHandler.handle);
  logger.verbose(`Initialization: GET ${readyRouteHandler.uri2} constructed`);
}
