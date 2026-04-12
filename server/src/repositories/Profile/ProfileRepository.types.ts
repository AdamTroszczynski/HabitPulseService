import { DateFormat, Lang } from '@db/enums';

export type GetProfileDTO = { userId: number };

export type UpdateProfileDTO = {
  userId: number;
  name?: string;
  dateFormat?: DateFormat;
  lang?: Lang;
};
