import { Request, Response } from 'express';
import { ProfileServices } from '@/modules/Profile/ProfileServices';
import { ok } from '@/helpers/ResponsHelpers';
import { UpdateProfileDTOSchema } from '@/modules/Profile/ProfileSchemas';

export class ProfileController {
  constructor(private readonly profileServices: ProfileServices) {}

  async getProfile(req: Request, res: Response) {
    const userId = req.userId!;

    const data = await this.profileServices.getProfile({ userId });

    ok(res, data);
  }

  async updateProfile(req: Request, res: Response) {
    const userId = req.userId!;
    const parsedBody = UpdateProfileDTOSchema.parse(req.body);

    const data = await this.profileServices.updateProfile({ userId, ...parsedBody });

    ok(res, data);
  }
}
