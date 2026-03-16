import { User } from 'generated/prisma/client.js';
import prisma from '@/lib/prisma.js';
import {
  ChangeUserPasswordDTO,
  CreateUserDTO,
  GetUserByEmailDTO,
  GetUserByIdDTO,
  VerifyUserDTO,
} from '@/repositories/User/UserRepository.types.js';

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

export const verifyUser = async (dto: VerifyUserDTO): Promise<User> => {
  return prisma.user.update({ where: { id: dto.id }, data: { isVerified: true } });
};
