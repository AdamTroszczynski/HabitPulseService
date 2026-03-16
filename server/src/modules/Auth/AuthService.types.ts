import { User } from 'generated/prisma/client.js';

export type LoginServiceResult = {
  user: User;
  token: string;
};
