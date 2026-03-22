export const EXCHANGES = {
  AUTH: 'habitpulse.auth',
} as const;

export const QUEUES = {
  AUTH_EMAIL: 'auth.email',
} as const;

export const AUTH_ROUTING_KEYS = {
  EMAIL: 'email',
} as const;

export const AUTH_EMAIL_TYPES = {
  ACTIVATION: 'activation',
  RESET_PASSWORD: 'resetPassword',
};

export type Exchange = (typeof EXCHANGES)[keyof typeof EXCHANGES];
export type Queues = (typeof QUEUES)[keyof typeof QUEUES];
export type AuthRoutingKey = (typeof AUTH_ROUTING_KEYS)[keyof typeof AUTH_ROUTING_KEYS];
export type AuthEmailTypes = (typeof AUTH_EMAIL_TYPES)[keyof typeof AUTH_EMAIL_TYPES];
