import { Router } from 'express';
import { totpController } from '@/containers';

const totpRouter = Router();

totpRouter.post('/enable', (req, res) => totpController.enable(req, res));
totpRouter.post('/disable', (req, res) => totpController.disable(req, res));
totpRouter.post('/verify-setup', (req, res) => totpController.verifySetup(req, res));

export { totpRouter };
