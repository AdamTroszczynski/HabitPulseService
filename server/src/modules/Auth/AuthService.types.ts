import { User } from 'generated/prisma/client';

export type LoginServiceResult = {
  user: User;
  token: string;
};
