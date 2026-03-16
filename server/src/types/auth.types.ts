export type AuthTokenDuration = 'long' | 'short';
export type AuthTokenType = 'auth' | 'activation' | 'resetPassword';

export type AuthToken = {
  jti: string;
  userId: number;
  type: AuthTokenType;
  duration: AuthTokenDuration;
  exp: number;
  iat: number;
};
