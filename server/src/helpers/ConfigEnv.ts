const requireEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error('Missing environment variable');
  return value;
};

const optionalEnv = (key: string, defaultValue: string): string => {
  return process.env[key] ?? defaultValue;
};

export const env = {
  JWT_SECRET: requireEnv('JWT_SECRET'),
  BCRYPT_ROUNDS: Number(requireEnv('BCRYPT_ROUNDS')),
  DATABASE_URL: requireEnv('DATABASE_URL'),
  NODE_ENV: requireEnv('NODE_ENV'),

  REDIS_URL: requireEnv('REDIS_URL'),
  RABBITMQ_URL: requireEnv('RABBITMQ_URL'),
  RABBITMQ_VHOST: optionalEnv('RABBITMQ_VHOST', '/'),
};
