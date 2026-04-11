import { Profile } from '@prisma/client';
import { GetProfileDTO, UpdateProfileDTO } from './ProfileServices.types';
import { ProfileRepository } from '@/repositories/Profile/ProfileRepository';

export class ProfileServices {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async getProfile(dto: GetProfileDTO): Promise<Profile | null> {
    return this.profileRepository.getProfile(dto);
  }

  async updateProfile(dto: UpdateProfileDTO): Promise<Profile> {
    return this.profileRepository.updateProfile(dto);
  }
}
