import { getLogger } from '@imaware/logger';
import * as winston from 'winston';

export default getLogger('healthcheck', {
  defaultMeta: { function: 'healthcheck' },
}) as winston.Logger;
