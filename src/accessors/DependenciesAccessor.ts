import axios from 'axios';
import logger from '../libs/logger';
import { HealthCheckDependencies } from '../libs/types';

export default class DependenciesAccessor {
  private healthcheckDependencies!: HealthCheckDependencies;

  public setDependencies = (healthcheckDependencies: HealthCheckDependencies) => {
    this.healthcheckDependencies = healthcheckDependencies;
  };

  private getDependencies = (): HealthCheckDependencies => this.healthcheckDependencies;

  public checkDependencies = async (): Promise<string> => {
    const dependencies = this.getDependencies();
    const healthcheckName: string[] = [];
    const healthcheckUris: Promise<Function>[] = [];

    for (const property in dependencies) {
      if (dependencies[property]) {
        healthcheckName.push(property);
        healthcheckUris.push(axios.get(`${dependencies[property]}/healthcheck/readyz`));
      } else {
        throw new Error(`${property} in options is not defined.`);
      }
    }

    if (healthcheckName.length && healthcheckUris.length) {
      try {
        const healthchecks = await Promise.allSettled(healthcheckUris);

        const rejectedHealthChecks: string[] = [];
        const successfulHealthChecks: string[] = [];
        healthchecks.forEach((promise, index) => {
          if (promise.status === 'rejected') {
            rejectedHealthChecks.push(healthcheckName[index]);
          } else {
            successfulHealthChecks.push(healthcheckName[index]);
          }
        });

        if (rejectedHealthChecks.length) {
          throw new Error(`healthchecks failed for ${rejectedHealthChecks.toString()}`);
        }

        return `Healthcheck success for ${successfulHealthChecks.toString()}`;
      } catch (err) {
        const error = err as Error;
        logger.error(`${error.message}`);
        throw err;
      }
    }

    return 'Healthcheck success';
  };
}
