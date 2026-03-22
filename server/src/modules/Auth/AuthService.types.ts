import { User } from '@prisma/client';

export type LoginServiceResult = {
  user: User;
  token: string;
};
