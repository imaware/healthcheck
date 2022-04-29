# Imaware Healthcheck

## Installation

```bash
yarn add @imaware/healthcheck
```

### Usage

```ts
import { healthcheck } from '@imaware/healthcheck';

export default class HealthCheckHandler extends BaseRouteHandler {
  constructor(app: Application) {
    super();
    app.get('/healthcheck', this.handle.bind(this));
  }

  async handle(req: Request, resp: Response): Promise<void> {
    const healthCheck = await healthcheck('lab-api'); // pass in API name above
    resp.status(200).send(healthCheck);
  }
}
```

### APIs dependencies

- [partner-api](https://github.com/imaware/partner-api)
  - fhir
  - order-tracking-api
- [lab-api](https://github.com/imaware/lab-api)
  - fhir
  - order-tracking-api
- [order-tracking-api](https://github.com/imaware/order-tracking-api)
  - fhir
  - result-interpretation-api
  - email-service
- [imaware-result-intepretation-api](https://github.com/imaware/imaware-result-intepretation-api)
  - fhir
- [imaware-email-service](https://github.com/imaware/imaware-email-service)
  - fhir
- [pdf-generator-api](https://github.com/imaware/pdf-generator-api)
  - fhir

### Credits

This package was created with Cookiecutter and the `imaware/imaware-microservice-template` project template.

[Cookiecutter](https://github.com/cookiecutter/cookiecutter)

[`imaware/imaware-microservice-template`](https://github.com/imaware/imaware-microservice-template)
