import { Application, Request, Response } from 'express';
import { dependenciesAccessor } from '../../accessors';
import ReadyRouteHandler from '../../express/routeHandlers/ReadyRouteHandler';
import StartRouteHandler from '../../express/routeHandlers/StartRouteHandler';
import { getFakeApplication, getFakeResponse } from './Express.util';

import Mock = jest.Mock;

jest.mock('axios');

describe('Route GET /healthcheck', () => {
  let req: Request;
  let resp: Response;
  let app: Application = getFakeApplication();

  beforeEach(() => {
    jest.resetAllMocks();
    app = getFakeApplication();
    resp = getFakeResponse();
  });

  it('can be constructed and initialized', () => {
    expect(typeof ReadyRouteHandler).toEqual('function');

    // eslint-disable-next-line no-unused-vars
    const readyRouteHandler = new ReadyRouteHandler(app);

    expect(app.get).toHaveBeenCalledTimes(2);
  });

  it('provides a readyRouteHandler response', () => {
    const readyRouteHandler = new ReadyRouteHandler(app);

    readyRouteHandler.handle(req, resp);

    expect(resp.status).toHaveBeenCalledTimes(1);
    expect(resp.send).toHaveBeenCalledTimes(1);

    // Extract the sent payload
    const outputObject = (resp.send as Mock).mock.calls[0][0];
    expect(outputObject.ok).toEqual(true);
  });

  it('can be constructed and initialized', () => {
    expect(typeof StartRouteHandler).toEqual('function');

    // eslint-disable-next-line no-unused-vars
    const startRouteHandler = new StartRouteHandler(app);

    expect(app.get).toHaveBeenCalledTimes(1);
  });

  it('provides a StartRouteHandler response', async () => {
    dependenciesAccessor.checkDependencies = jest.fn().mockRejectedValue(new Error('healthchecks failed for API'));
    const startRouteHandler = new StartRouteHandler(app);

    await startRouteHandler.handle(req, resp);

    expect(resp.status).toHaveBeenCalledTimes(1);
    expect(resp.send).toHaveBeenCalledTimes(1);

    // Extract the sent payload
    const outputObject = (resp.send as Mock).mock.calls[0][0];
    expect(outputObject.ok).toEqual(false);
    expect(outputObject.message).toEqual('healthchecks failed for API');
  });
});
