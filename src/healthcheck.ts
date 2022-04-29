/* eslint-disable no-await-in-loop */
import { getDependencies } from './dependencies/getDependencies';

export const healthcheck = async (apiName: string) => {
  try {
    const serviceDependencies = getDependencies(apiName);

    for (const dependency of serviceDependencies) {
      await dependency();
    }

    return { ok: true };
  } catch (err) {
    return { ok: false };
  }
};
