import pino, { Logger } from 'pino';
import { env } from '@shared/helpers/ConfigEnv';
import { asyncLocalStorage } from '@shared/helpers/AsyncStore';

const baseLogger = pino({
  level: env.NODE_ENV === 'production' ? 'info' : 'debug',
  transport: env.NODE_ENV === 'production' ? undefined : { target: 'pino-pretty' },
});
const getLogger = (): Logger => {
  const store = asyncLocalStorage.getStore();
  return store ? baseLogger.child({ correlationId: store.correlationId }) : baseLogger;
};

export const logger = {
  info: (...args: Parameters<Logger['info']>) => getLogger().info(...args),
  error: (...args: Parameters<Logger['error']>) => getLogger().error(...args),
  warn: (...args: Parameters<Logger['warn']>) => getLogger().warn(...args),
  debug: (...args: Parameters<Logger['debug']>) => getLogger().debug(...args),
  fatal: (...args: Parameters<Logger['fatal']>) => getLogger().fatal(...args),
};
