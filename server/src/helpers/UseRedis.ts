import { redisClient } from '@shared/lib/redis';
import { rateLimits } from '@/const/RateLimits';

export const useRedis = {
  setBlacklistToken: (tokenId: string, ttl: number): Promise<string | null> => {
    return redisClient.set(`blacklist:${tokenId}`, '1', { EX: ttl });
  },
  getBlacklistToken: (tokenId: string): Promise<string | null> => {
    return redisClient.get(`blacklist:${tokenId}`);
  },
  incrementLoginCounter: async (type: 'ip' | 'email', value: string): Promise<number> => {
    const key = `ratelimit:login:${type}:${value}`;
    const count = await redisClient.incr(key);
    if (count === 1) await redisClient.expire(key, rateLimits.login[type].ttl);
    return count;
  },
  incrementRegisterCounter: async (ip: string): Promise<number> => {
    const key = `ratelimit:register:ip:${ip}`;
    const count = await redisClient.incr(key);
    if (count === 1) await redisClient.expire(key, rateLimits.register.ip.ttl);
    return count;
  },
};
