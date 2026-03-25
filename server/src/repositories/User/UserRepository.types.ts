import { Providers } from '@/lib/passport';

export type GetUserByIdDTO = {
  id: number;
};

export type GetUserByEmailDTO = {
  email: string;
};

export type GetUserByProviderDTO = {
  providerName: Providers;
  providerValue: string;
};

export type CreateUserDTO = {
  email: string;
  passwordHash: string;
};

export type CreateUserOAuthDTO = {
  email: string;
  providerName: Providers;
  providerValue: string;
};

export type ChangeUserPasswordDTO = {
  id: number;
  passwordHash: string;
};

export type EnableUserTotpDTO = {
  id: number;
  isEnabled: boolean;
};

export type ChangeUserTotpSecretDTO = {
  id: number;
  secret: string | null;
};

export type ChangeUserProviderIdDTO = {
  id: number;
  providerName: Providers;
  providerValue: string;
};

export type VerifyUserDTO = {
  id: number;
};
