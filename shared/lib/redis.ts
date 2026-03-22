import { createClient } from 'redis';
import { env } from '@shared/helpers/ConfigEnv';
import { logger } from '@shared/lib/logger';

const redisClient = createClient({ url: env.REDIS_URL });

redisClient.on('error', (err) => logger.error({ err }, 'Redis error'));
redisClient.on('connect', () => logger.info('Redis connected'));

export default redisClient;
