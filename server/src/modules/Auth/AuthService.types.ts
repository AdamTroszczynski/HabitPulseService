export type LoginServiceResult = {
  token: string;
  requiresTOTP: boolean;
};

export type CheckTotpCodeServiceResult = {
  token: string;
};
