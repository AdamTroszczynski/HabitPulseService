import { DateFormat } from '@prisma/enums';
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

export type UpdateUserDTO = {
  email?: string;
  name?: string;
  dateFormat?: DateFormat;
  language?: string;
};

export type UpdateUserEmailDTO = {
  userId: number;
  email: string;
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

export type UpdateUserPasswordDTO = {
  id: number;
  passwordHash: string;
};

export type UpdateUserTotpDTO = {
  id: number;
  isEnabled: boolean;
};

export type UpdateUserTotpSecretDTO = {
  id: number;
  secret: string | null;
};

export type UpdateUserProviderIdDTO = {
  id: number;
  providerName: Providers;
  providerValue: string;
};

export type UpdateUserVerificationDTO = {
  id: number;
};
