import z from 'zod';
export const LoginDTOSchema = z.object({
    email: z.email().nonempty(),
    password: z.string().min(6),
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
//# sourceMappingURL=AuthSchemas.js.map