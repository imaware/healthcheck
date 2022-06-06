# Imaware Healthcheck

Reuseable healthcheck package to be used by fastify servers and express servers.

## Default endpoints

- GET `/healthcheck` - default healthcheck is API up
- GET `/healthcheck/startz` - default healthcheck is API up
- GET `/healthcheck/readyz` - healthcheck is API up and are dependencies up

## Usage

### Installation

```bash
yarn add @imaware/healthcheck
```

#### API Dependencies

  ```typescript
  const dependencies = {
    serviceHealthcheck: 'http://service.healthcheck',
    serviceStart: 'http://service.start',
    serviceReady: 'http://service.ready',
  };
  ```

#### Fastify Usage

  ```typescript
  import { healthcheck }  from '@imaware/healthcheck';

  const RouteHandlers = [HealthCheckHandler];

  export default fp(async (app: FastifyInstance) => {
    for (const routeHandler of RouteHandlers) {
      new routeHandler(app);
    }

    /* Pass in app and name of service or API
    * app: FastifyInstance
    * opts: { name: string }
    */
    healthcheck(app, dependencies);
  });
  ```

#### Express Usage

  ```typescript
  import { healthcheck }  from '@imaware/healthcheck';

  // route handlers
  for (const routeHandler of RouteHandlers) {
    new routeHandler(app);
  }

  /* Pass in app and name of service or API
  * app: express.Application
  * opts: { name: string }
  */
  healthcheck(app, dependencies);
  ```

#### API has no additional dependencies

  ```typescript
  import { healthcheck }  from '@imaware/healthcheck';

  healthcheck(app);
  ```

### Credits

This package was created with Cookiecutter and the `imaware/imaware-microservice-template` project template.

[Cookiecutter](https://github.com/cookiecutter/cookiecutter)

[`imaware/imaware-microservice-template`](https://github.com/imaware/imaware-microservice-template)
