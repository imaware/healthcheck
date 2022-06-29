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
  const options = {
    dependencies: {
      serviceHealthcheck: 'http://service.healthcheck',
      serviceStart: 'http://service.start',
      serviceReady: 'http://service.ready',
    },
  };
  ```

#### Fastify Usage

  ```typescript
  import { healthcheck }  from '@imaware/healthcheck';

  const RouteHandlers = [HealthCheckHandler];

  export default fp(async (app: FastifyInstance) => {
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

#### Example responses

Response for `/healthcheck`

  ```json
  { "ok": true }
  ```

Response for `/healthcheck/readyz`

  ```json
  { "ok": true }
  ```

Response for `/healthcheck/startz` with dependencies

  ```json
  { "ok": true, "message": "Healthcheck success for service" }
  ```

Response for `/healthcheck/startz` without dependencies

  ```json
  { "ok": true, "message": "Healthcheck success" }
  ```

### Options

`dependencies`

By default this is not required. You can pass in JSON object as API name (key) and API URI (value).
Healthcheck will check each dependency to check if service is up.

```typescript
  const options = {
    dependencies: {
      serviceHealthcheck: 'http://service.healthcheck',
      serviceStart: 'http://service.start',
      serviceReady: 'http://service.ready',
    },
  };
  ```
