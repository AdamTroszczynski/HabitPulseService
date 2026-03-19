import z from 'zod';

export const AuthEmailDTOSchema = z.object({
  type: z.string().nonempty(),
  email: z.email().nonempty(),
  token: z.string().nonempty(),
});

export type AuthEmailDTO = z.infer<typeof AuthEmailDTOSchema>;
