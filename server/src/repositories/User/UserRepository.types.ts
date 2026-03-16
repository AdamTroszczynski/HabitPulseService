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

export type VerifyUserDTO = {
  id: number;
};
