import { PrismaClient, User } from '@prisma/client';
import {
  UpdateUserPasswordDTO,
  UpdateUserProviderIdDTO,
  UpdateUserTotpSecretDTO,
  CreateUserDTO,
  CreateUserOAuthDTO,
  UpdateUserTotpDTO,
  GetUserByEmailDTO,
  GetUserByIdDTO,
  GetUserByProviderDTO,
  UpdateUserDTO,
  UpdateUserVerificationDTO,
  UpdateUserEmailDTO,
} from '@/repositories/User/UserRepository.types';

export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  getUserById(dto: GetUserByIdDTO): Promise<User | null> {
    return this.prisma.user.findUnique({ where: dto });
  }

  getUserByEmail(dto: GetUserByEmailDTO): Promise<User | null> {
    return this.prisma.user.findUnique({ where: dto });
  }

  getUserByProvider(dto: GetUserByProviderDTO): Promise<User | null> {
    return this.prisma.user.findUnique({ where: dto.providerName === 'google' ? { googleId: dto.providerValue } : { githubId: dto.providerValue } });
  }

  createUser(dto: CreateUserDTO): Promise<User> {
    return this.prisma.user.create({ data: { ...dto, profile: { create: { name: dto.email } } } });
  }

  createUserOAuth(dto: CreateUserOAuthDTO): Promise<User> {
    const defaultFields = { email: dto.email, name: dto.email };
    return this.prisma.user.create({ data: dto.providerName === 'google' ? { googleId: dto.providerValue, ...defaultFields } : { githubId: dto.providerValue, ...defaultFields } });
  }

  updateUser(dto: UpdateUserDTO): Promise<User> {
    return this.prisma.user.update({ where: { email: dto.email! }, data: dto });
  }

  updateUserEmail(dto: UpdateUserEmailDTO): Promise<User> {
    return this.prisma.user.update({ where: { id: dto.userId }, data: { email: dto.email } });
  }

  updateUserPassword(dto: UpdateUserPasswordDTO): Promise<User> {
    return this.prisma.user.update({ where: { id: dto.id }, data: { passwordHash: dto.passwordHash } });
  }

  updateUserTotp(dto: UpdateUserTotpDTO): Promise<User> {
    return this.prisma.user.update({ where: { id: dto.id }, data: { totpEnabled: dto.isEnabled } });
  }

  updateUserTotpSecret(dto: UpdateUserTotpSecretDTO): Promise<User> {
    return this.prisma.user.update({ where: { id: dto.id }, data: { secretBase32: dto.secret } });
  }

  updateUserProviderId(dto: UpdateUserProviderIdDTO): Promise<User> {
    return this.prisma.user.update({ where: { id: dto.id }, data: dto.providerName === 'google' ? { googleId: dto.providerValue } : { githubId: dto.providerValue } });
  }

  updateUserVerification(dto: UpdateUserVerificationDTO): Promise<User> {
    return this.prisma.user.update({ where: { id: dto.id }, data: { isVerified: true } });
  }
}
