import { createClient, SetOptions } from 'redis';
import { env } from '@shared/helpers/ConfigEnv';
import { logger } from '@shared/lib/logger';
import { REDIS_PREFIX } from '@/const/CommonConst';

const client = createClient({ url: env.REDIS_URL });

client.on('error', (err) => logger.error({ err }, 'Redis error'));
client.on('connect', () => logger.info('Redis connected'));

const addPrefix = (key: string) => `${REDIS_PREFIX}${key}`;

export const redisClient = {
  get: (key: string) => client.get(addPrefix(key)),
  set: (key: string, value: string, options?: SetOptions) => client.set(addPrefix(key), value, options),
  del: (key: string) => client.del(addPrefix(key)),
  exists: (key: string) => client.exists(addPrefix(key)),
  incr: (key: string) => client.incr(addPrefix(key)),
  expire: (key: string, ttl: number) => client.expire(addPrefix(key), ttl),
  connect: () => client.connect(),
  quit: () => client.quit(),
  on: client.on.bind(client),
};
