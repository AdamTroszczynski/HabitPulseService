import { Router } from 'express';
import { disableController, enableController, verifySetupController } from '@/modules/Totp/TotpController';

const totpRouter = Router();

totpRouter.post('/enable', enableController);
totpRouter.post('/disable', disableController);
totpRouter.post('/verify-setup', verifySetupController);

export { totpRouter };
