import express, { Application, Express, Request, Response } from 'express';
import Routes from '../../express/routeHandlers';
import logger from '../../libs/logger';

export function getFakeApplication(): Application {
  const fakeApp: Application = {
    delete: jest.fn(),
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
  } as Partial<Application> as Application;
  return fakeApp;
}

export function getFakeResponse(): Response {
  const resp = {
    send: jest.fn(),
    status: jest.fn().mockImplementation(() => resp),
    set: jest.fn(),
  } as Partial<Response> as Response;
  return resp;
}

export function getFakeRequest(): Request {
  const req = {
    headers: {},
    body: {},
    params: {},
    files: {},
  } as Partial<Request> as Request;
  return req;
}

export async function startTestHost(): Promise<Express> {
  const app = express();
  app.use(express.json());

  const port = 3000; // default port to listen

  // Accumulate Routes
  for (const routeHandler of Routes) {
    // eslint-disable-next-line new-cap,no-new
    new routeHandler(app);
  }

  // start the express server
  app.listen(port, () => {
    logger.info(`server started at ${port}`);
  });
  return app;
}
