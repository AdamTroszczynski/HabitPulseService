import z from 'zod';

export const VerifySetupDTOSchema = z.object({
  code: z.string().nonempty(),
});

export const DisableDTOSchema = z.object({
  code: z.string().nonempty(),
});
