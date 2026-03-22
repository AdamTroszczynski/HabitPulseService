import { Request, Response } from 'express';
import { ok } from '@/helpers/ResponsHelpers';
import { enableService, verifySetupService } from '@/modules/Totp/TotpServices';
import { VerifySetupDTOSchema } from '@/modules/Totp/TotpSchemas';

export const enableController = async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;

  const data = await enableService({ userId });

  ok(res, data);
};

export const verifySetupController = async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId!;
  const dto = VerifySetupDTOSchema.parse(req.body);

  await verifySetupService({ userId, code: dto.code });

  ok(res, null);
};
