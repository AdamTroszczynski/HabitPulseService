import { createClient } from 'redis';
import { env } from '@/helpers/ConfigEnv';

const redisClient = createClient({ url: env.REDIS_URL });

redisClient.on('error', (err) => console.error('Redis error:', err));
redisClient.on('connect', () => console.log('Redis connected'));

export default redisClient;
