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
  RABBITMQ_VHOST: optionalEnv('RABBITMQ_VHOST', '/'),
};
