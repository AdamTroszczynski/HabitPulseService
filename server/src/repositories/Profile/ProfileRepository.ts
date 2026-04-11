import { PrismaClient, Profile } from '@prisma/client';
import { GetProfileDTO, UpdateProfileDTO } from '@/repositories/Profile/ProfileRepository.types';

export class ProfileRepository {
  constructor(private readonly prisma: PrismaClient) {}

  getProfile(dto: GetProfileDTO): Promise<Profile | null> {
    return this.prisma.profile.findUnique({ where: dto });
  }

  updateProfile(dto: UpdateProfileDTO): Promise<Profile> {
    const { userId, ...data } = dto;
    return this.prisma.profile.update({ where: { userId }, data });
  }
}
