/* eslint-disable no-new, new-cap */
import { Application } from 'express';
import Routes from './routeHandlers';

export const expressHealthcheck = (app: Application) => {
  for (const routeHandler of Routes) {
    new routeHandler(app);
  }
};
