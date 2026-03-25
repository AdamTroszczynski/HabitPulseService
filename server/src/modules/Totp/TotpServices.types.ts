export type EnableServiceDTO = {
  userId: number;
};

export type DisableServiceDTO = {
  userId: number;
  code: string;
};

export type VerifySetupServiceDTO = {
  userId: number;
  code: string;
};
