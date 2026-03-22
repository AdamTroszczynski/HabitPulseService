export const AUTH_TOKEN_DURATION = {
  LONG: 'long',
  SHORT: 'short',
} as const;

export const AUTH_TOKEN_TYPE = {
  AUTH: 'auth',
  ACTIVATION: 'activation',
  RESET_PASSWORD: 'resetPassword',
  TOTP: 'totp',
} as const;

export type AuthTokenType = (typeof AUTH_TOKEN_TYPE)[keyof typeof AUTH_TOKEN_TYPE];
export type AuthTokenDuration = (typeof AUTH_TOKEN_DURATION)[keyof typeof AUTH_TOKEN_DURATION];
export type AuthToken = {
  jti: string;
  userId: number;
  type: AuthTokenType;
  duration: AuthTokenDuration;
  exp: number;
  iat: number;
};
