import { User } from '@prisma/client';
import prisma from '@/lib/prisma';
import {
  ChangeUserPasswordDTO,
  ChangeUserTotpSecretDTO,
  CreateUserDTO,
  EnableUserTotpDTO,
  GetUserByEmailDTO,
  GetUserByIdDTO,
  VerifyUserDTO,
} from '@/repositories/User/UserRepository.types';

export const getUserById = async (dto: GetUserByIdDTO): Promise<User | null> => {
  return prisma.user.findUnique({ where: dto });
};

export const getUserByEmail = async (dto: GetUserByEmailDTO): Promise<User | null> => {
  return prisma.user.findUnique({ where: dto });
};

export const createUser = async (dto: CreateUserDTO): Promise<User> => {
  return prisma.user.create({ data: dto });
};

export const changeUserPassword = async (dto: ChangeUserPasswordDTO): Promise<User> => {
  return prisma.user.update({ where: { id: dto.id }, data: { passwordHash: dto.passwordHash } });
};

export const changeUserTotp = async (dto: EnableUserTotpDTO): Promise<User> => {
  return prisma.user.update({ where: { id: dto.id }, data: { totpEnabled: dto.isEnabled } });
};

export const changeUserTotpSecret = async (dto: ChangeUserTotpSecretDTO): Promise<User> => {
  return prisma.user.update({ where: { id: dto.id }, data: { secretBase32: dto.secret } });
};

export const verifyUser = async (dto: VerifyUserDTO): Promise<User> => {
  return prisma.user.update({ where: { id: dto.id }, data: { isVerified: true } });
};
