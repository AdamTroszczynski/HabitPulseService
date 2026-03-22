import { Router } from 'express';
import { enableController, verifySetupController } from '@/modules/Totp/TotpController';

const totpRouter = Router();

totpRouter.post('/enable', enableController);
totpRouter.post('/verify-setup', verifySetupController);

export { totpRouter };
