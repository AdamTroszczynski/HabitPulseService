import z from 'zod';
import { UpdateProfileDTOSchema } from '@/modules/Profile/ProfileSchemas';

export type GetProfileDTO = { userId: number };
export type UpdateProfileDTO = z.infer<typeof UpdateProfileDTOSchema> & { userId: number };
