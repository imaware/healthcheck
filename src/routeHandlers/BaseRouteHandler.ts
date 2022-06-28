export default class BaseRouteHandler {
  protected successCode: number = 200;

  protected errorStatusCode: number = 500;

  protected healthCheckResponse = {
    ok: true,
  };

  protected failedHealthCheckResponse = {
    ok: false,
  };

  get _name() {
    return this.constructor.name;
  }
}
