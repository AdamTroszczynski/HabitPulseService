import z from 'zod';

export const LoginDTOSchema = z.object({
  email: z.email().nonempty(),
  password: z.string().min(6),
  rememberMe: z.boolean(),
});

export const CheckTotpCodeDTOSchema = z.object({
  token: z.string().nonempty(),
  code: z.string().min(6).max(6),
  rememberMe: z.boolean(),
});

export const LogoutDTOSchema = z.object({
  token: z.string().nonempty(),
});

export const RegisterDTOSchema = z.object({
  email: z.email().nonempty(),
  password: z.string().nonempty(),
});

export const ActivateDTOSchema = z.object({
  token: z.string().nonempty(),
});

export const ResetPasswordDTOSchema = z.object({
  email: z.email().nonempty(),
});

export const ChangePasswordDTOSchema = z.object({
  password: z.string().min(6),
  token: z.string().nonempty(),
});

export const ResendActivationDTOSchema = z.object({
  email: z.email().nonempty(),
});

export type LoginDTO = z.infer<typeof LoginDTOSchema>;
export type CheckTotpCodeDTO = z.infer<typeof CheckTotpCodeDTOSchema>;
export type LogoutDTO = z.infer<typeof LogoutDTOSchema>;
export type RegisterDTO = z.infer<typeof RegisterDTOSchema>;
export type ActivateDTO = z.infer<typeof ActivateDTOSchema>;
export type ResetPasswordDTO = z.infer<typeof ResetPasswordDTOSchema>;
export type ChangePasswordDTO = z.infer<typeof ChangePasswordDTOSchema>;
export type ResendActivationDTO = z.infer<typeof ResendActivationDTOSchema>;
