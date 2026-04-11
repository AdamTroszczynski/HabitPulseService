import { DateFormat, Lang } from '@prisma/enums';

export type GetProfileDTO = { userId: number };

export type UpdateProfileDTO = {
  userId: number;
  name?: string;
  dateFormat?: DateFormat;
  lang?: Lang;
};
