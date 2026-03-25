import { User } from '@prisma/client';
import prisma from '@/lib/prisma';
import {
  ChangeUserPasswordDTO,
  ChangeUserProviderIdDTO,
  ChangeUserTotpSecretDTO,
  CreateUserDTO,
  CreateUserOAuthDTO,
  EnableUserTotpDTO,
  GetUserByEmailDTO,
  GetUserByIdDTO,
  GetUserByProviderDTO,
  VerifyUserDTO,
} from '@/repositories/User/UserRepository.types';

export const getUserById = (dto: GetUserByIdDTO): Promise<User | null> => {
  return prisma.user.findUnique({ where: dto });
};

export const getUserByEmail = (dto: GetUserByEmailDTO): Promise<User | null> => {
  return prisma.user.findUnique({ where: dto });
};

export const getUserByProvider = (dto: GetUserByProviderDTO): Promise<User | null> => {
  return prisma.user.findUnique({ where: dto.providerName === 'google' ? { googleId: dto.providerValue } : { githubId: dto.providerValue } });
};

export const createUser = (dto: CreateUserDTO): Promise<User> => {
  return prisma.user.create({ data: { ...dto, name: dto.email } });
};

export const createUserOAuth = (dto: CreateUserOAuthDTO): Promise<User> => {
  const defaultFields = { email: dto.email, name: dto.email };
  return prisma.user.create({ data: dto.providerName === 'google' ? { googleId: dto.providerValue, ...defaultFields } : { githubId: dto.providerValue, ...defaultFields } });
};

export const changeUserPassword = (dto: ChangeUserPasswordDTO): Promise<User> => {
  return prisma.user.update({ where: { id: dto.id }, data: { passwordHash: dto.passwordHash } });
};

export const changeUserTotp = (dto: EnableUserTotpDTO): Promise<User> => {
  return prisma.user.update({ where: { id: dto.id }, data: { totpEnabled: dto.isEnabled } });
};

export const changeUserTotpSecret = (dto: ChangeUserTotpSecretDTO): Promise<User> => {
  return prisma.user.update({ where: { id: dto.id }, data: { secretBase32: dto.secret } });
};

export const changeUserProviderId = (dto: ChangeUserProviderIdDTO): Promise<User> => {
  return prisma.user.update({ where: { id: dto.id }, data: dto.providerName === 'google' ? { googleId: dto.providerValue } : { githubId: dto.providerValue } });
};

export const verifyUser = (dto: VerifyUserDTO): Promise<User> => {
  return prisma.user.update({ where: { id: dto.id }, data: { isVerified: true } });
};
