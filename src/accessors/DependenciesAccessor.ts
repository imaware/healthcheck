import axios from 'axios';
import logger from '../libs/logger';
import { HealthcheckDependencies } from '../libs/types';

export default class DependenciesAccessor {
  private healthcheckDependencies!: HealthcheckDependencies;

  public setDependencies = (healthcheckDependencies: HealthcheckDependencies) => {
    this.healthcheckDependencies = healthcheckDependencies;
  };

  private getDependencies = (): HealthcheckDependencies => this.healthcheckDependencies;

  public checkDependencies = async (): Promise<void> => {
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
        healthchecks.forEach((promise, index) => {
          if (promise.status === 'rejected') {
            rejectedHealthChecks.push(healthcheckName[index]);
          }
        });

        if (rejectedHealthChecks.length) {
          throw new Error(`healthchecks failed for ${rejectedHealthChecks.toString()}`);
        }
      } catch (err) {
        const error = err as Error;
        logger.error(`${error.message}`);
        throw err;
      }
    }
  };
}
