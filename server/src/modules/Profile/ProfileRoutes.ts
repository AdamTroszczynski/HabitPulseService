import { Router } from 'express';
import { profileController } from '@/containers';

const profileRouter = Router();

profileRouter.get('/', (req, res) => profileController.getProfile(req, res));
profileRouter.patch('/', (req, res) => profileController.updateProfile(req, res));

export { profileRouter };
