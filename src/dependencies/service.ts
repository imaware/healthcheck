import axios from 'axios';
import logger from '../libs/logger';

export const service = async (apiName: string, uri: string | undefined): Promise<void> => {
  try {
    if (!uri) {
      throw Error(`uri is undefined - not configured or changed`);
    }

    await axios.get(`${uri}/ping`);
  } catch (err) {
    const error = err as Error;
    logger.error(`${apiName} service: ${error.message}`);
    throw err;
  }
};
