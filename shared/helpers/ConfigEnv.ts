const requireEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error('Missing environment variable');
  return value;
};

const optionalEnv = (key: string, defaultValue: string): string => {
  return process.env[key] ?? defaultValue;
};

export const env = {
  API_URL: requireEnv('API_URL'),
  PORT: requireEnv('PORT'),
  JWT_SECRET: requireEnv('JWT_SECRET'),
  BCRYPT_ROUNDS: Number(requireEnv('BCRYPT_ROUNDS')),
  DATABASE_URL: requireEnv('DATABASE_URL'),
  NODE_ENV: requireEnv('NODE_ENV'),

  REDIS_URL: requireEnv('REDIS_URL'),
  RABBITMQ_URL: requireEnv('RABBITMQ_URL'),
  RABBITMQ_VHOST: optionalEnv('RABBITMQ_VHOST', '/'),

  GITHUB_CLIENT_ID: requireEnv('GITHUB_CLIENT_ID'),
  GITHUB_CLIENT_SECRET: requireEnv('GITHUB_CLIENT_SECRET'),
  GOOGLE_CLIENT_ID: requireEnv('GOOGLE_CLIENT_ID'),
  GOOGLE_CLIENT_SECRET: requireEnv('GOOGLE_CLIENT_SECRET'),

  MAIL_EMAIL: requireEnv('MAIL_EMAIL'),
  MAIL_PASSWORD: requireEnv('MAIL_PASSWORD'),
  MAIL_HOST: requireEnv('MAIL_HOST'),
  MAIL_PORT: requireEnv('MAIL_PORT'),
};
