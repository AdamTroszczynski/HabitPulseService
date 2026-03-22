export type GetUserByIdDTO = {
  id: number;
};

export type GetUserByEmailDTO = {
  email: string;
};

export type CreateUserDTO = {
  email: string;
  passwordHash: string;
  name: string;
};

export type ChangeUserPasswordDTO = {
  id: number;
  passwordHash: string;
};

export type EnableUserTotpDTO = {
  id: number;
  isEnabled: boolean;
};

export type ChangeUserTotpSecretDTO = {
  id: number;
  secret: string;
};

export type VerifyUserDTO = {
  id: number;
};
