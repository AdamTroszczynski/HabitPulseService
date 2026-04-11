import { Request, Response } from 'express';
import { ok } from '@/helpers/ResponsHelpers';
import { TotpService } from '@/modules/Totp/TotpServices';
import { DisableDTOSchema, VerifySetupDTOSchema } from '@/modules/Totp/TotpSchemas';

export class TotpController {
  constructor(private readonly totpService: TotpService) {}

  async enable(req: Request, res: Response): Promise<void> {
    const userId = req.userId!;

    const data = await this.totpService.enable({ userId });

    ok(res, data);
  }

  async disable(req: Request, res: Response): Promise<void> {
    const userId = req.userId!;

    const data = DisableDTOSchema.parse(req.body);

    await this.totpService.disable({ userId, code: data.code });

    ok(res, null);
  }

  async verifySetup(req: Request, res: Response): Promise<void> {
    const userId = req.userId!;
    const dto = VerifySetupDTOSchema.parse(req.body);

    await this.totpService.verifySetup({ userId, code: dto.code });

    ok(res, null);
  }
}
