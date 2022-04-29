import { google } from 'googleapis';
import logger from '../libs/logger';

const connect = async () => {
  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });
  google.options({ auth });
};

export const fhir = async (): Promise<void> => {
  try {
    const { GCP_PROJECT, GCP_REGION } = process.env;
    if (!GCP_PROJECT || !GCP_REGION) {
      throw new Error(`Could not initialize FhirStoreAccessor, missing env var(s): ${!GCP_PROJECT ? 'GCP_PROJECT' : ''}${!GCP_REGION ? 'GCP_REGION, ' : ''}`);
    }

    await connect();

    const healthcare = google.healthcare('v1');
    await healthcare.projects.locations.get({
      name: `projects/${GCP_PROJECT}/locations/${GCP_REGION}`,
    });
  } catch (err) {
    const error = err as Error;
    logger.error(`healthcheck.fhir: ${error.message}`);
    throw err;
  }
};
