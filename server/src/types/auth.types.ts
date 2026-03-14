type AuthTokenDuration = 'long' | 'short';

export type AuthToken = {
  userId: number;
  type: AuthTokenDuration;
  exp: number;
};
