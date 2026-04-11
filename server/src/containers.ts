import prisma from '@/lib/prisma';
import { AuthController } from '@/modules/Auth/AuthController';
import { AuthService } from '@/modules/Auth/AuthService';
import { UserRepository } from '@/repositories/User/UserRepository';
import { AuditRepository } from '@/repositories/Audit/AuditRepository';
import { TotpController } from '@/modules/Totp/TotpController';
import { TotpService } from '@/modules/Totp/TotpServices';
import { ProfileRepository } from '@/repositories/Profile/ProfileRepository';
import { ProfileServices } from '@/modules/Profile/ProfileServices';
import { ProfileController } from '@/modules/Profile/ProfileController';

export const userRepository = new UserRepository(prisma);
export const profileRepository = new ProfileRepository(prisma);
export const auditRepository = new AuditRepository(prisma);

export const authService = new AuthService(userRepository);
export const authController = new AuthController(authService);

export const totpService = new TotpService(userRepository);
export const totpController = new TotpController(totpService);

export const profileServices = new ProfileServices(profileRepository);
export const profileController = new ProfileController(profileServices);
