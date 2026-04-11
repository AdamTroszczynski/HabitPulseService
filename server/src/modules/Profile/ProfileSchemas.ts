import z from 'zod';

export const UpdateProfileDTOSchema = z.object({
  name: z.string().nonempty().optional(),
  dateFormat: z.enum(['DD_MM_YYYY', 'MM_DD_YYYY', 'YYYY_MM_DD']).optional(),
  lang: z.enum(['PL', 'EN']).optional(),
});
