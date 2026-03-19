const requireEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error('Missing environment variable');
  return value;
};

const optionalEnv = (key: string, defaultValue: string): string => {
  return process.env[key] ?? defaultValue;
};

export const env = {
  RABBITMQ_URL: requireEnv('RABBITMQ_URL'),
  MAIL_EMAIL: requireEnv('MAIL_EMAIL'),
  MAIL_PASSWORD: requireEnv('MAIL_PASSWORD'),
  MAIL_HOST: requireEnv('MAIL_HOST'),
  MAIL_PORT: requireEnv('MAIL_PORT'),
  RABBITMQ_VHOST: optionalEnv('RABBITMQ_VHOST', '/'),
};
