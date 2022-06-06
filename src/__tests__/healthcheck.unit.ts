import axios from 'axios';
import express from 'express';
import fastify from 'fastify';
import request, { Response } from 'supertest';
import { healthcheck } from '../healthcheck';
import { HealthcheckDependencies } from '../libs/types';

jest.mock('axios');

describe('healthcheck.ts', () => {
  const healthcheckUri = '/healthcheck';
  const healthcheckReadyUri = '/healthcheck/readyz';
  const healthcheckStartUri = '/healthcheck/startz';
  const dependencies: HealthcheckDependencies = {
    serviceHealthcheck: 'http://service.healthcheck',
    serviceStart: 'http://service.start',
    serviceReady: 'http://service.ready',
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('test fastify application with /healthcheck', async () => {
    const app = fastify();
    healthcheck(app);
    await app.ready();

    const reply = await app.inject({
      method: 'GET',
      url: healthcheckUri,
    });

    expect(reply.statusCode).toBe(200);
    expect(reply.body).toEqual(JSON.stringify({ ok: true }));
  });

  it('test fastify application with /healthcheck/readyz', async () => {
    const app = fastify();
    healthcheck(app);
    await app.ready();

    const reply = await app.inject({
      method: 'GET',
      url: healthcheckReadyUri,
    });

    expect(reply.statusCode).toBe(200);
    expect(reply.body).toEqual(JSON.stringify({ ok: true }));
  });

  it('test fastify application with /healthcheck/startz', async () => {
    const app = fastify();
    healthcheck(app, dependencies);
    await app.ready();

    const reply = await app.inject({
      method: 'GET',
      url: healthcheckStartUri,
    });

    expect(reply.statusCode).toBe(200);
    expect(reply.body).toEqual(JSON.stringify({ ok: true }));
    expect(axios.get).toBeCalledTimes(3);
  });

  it('test error thrown with /healthcheck/startz', async () => {
    axios.get = jest.fn().mockRejectedValue(new Error('throw err'));
    const app = fastify();
    healthcheck(app, dependencies);
    await app.ready();

    const reply = await app.inject({
      method: 'GET',
      url: healthcheckStartUri,
    });

    expect(reply.statusCode).toBe(500);
    expect(reply.body).toEqual(JSON.stringify({ ok: false, errorMessage: 'Internal Server Error' }));
  });

  it('test express application with /healthcheck', done => {
    const app = express();
    healthcheck(app);
    request(app)
      .get(healthcheckUri)
      .expect(200)
      .end((err, res: Response) => {
        if (err) {
          done(err);
        }
        expect(res.body.ok).toEqual(true);
        done();
      });
  });

  it('test express application with /healthcheck/readyz', done => {
    const app = express();
    healthcheck(app);
    request(app)
      .get(healthcheckReadyUri)
      .expect(200)
      .end((err, res: Response) => {
        if (err) {
          done(err);
        }
        expect(res.body.ok).toEqual(true);
        done();
      });
  });

  it('test express application with /healthcheck/startz', done => {
    const app = express();
    healthcheck(app, dependencies);
    request(app)
      .get(healthcheckStartUri)
      .expect(200)
      .end((err, res: Response) => {
        if (err) {
          done(err);
        }
        expect(res.body.ok).toEqual(true);
        expect(axios.get).toBeCalledTimes(3);
        done();
      });
  });

  it('test express app error thrown with /healthcheck/startz', done => {
    axios.get = jest.fn().mockRejectedValue(new Error('throw err'));
    const app = express();
    healthcheck(app, dependencies);
    request(app)
      .get(healthcheckStartUri)
      .expect(500)
      .end((err, res: Response) => {
        if (err) {
          done(err);
        }
        expect(res.body).toEqual({ ok: false, errorMessage: 'Internal Server Error' });
        done();
      });
  });
});
