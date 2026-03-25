export const rateLimits = {
  login: {
    ip: { max: 10, ttl: 60 * 15 },
    email: { max: 5, ttl: 60 * 15 },
  },
  register: {
    ip: { max: 5, ttl: 60 * 60 },
  },
};
