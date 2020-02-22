import { Router } from 'express';
import { SignUp, SignIn, twilio } from '../controllers/user.controller';

const router = Router();

router.post('/auth', SignUp);
router.post('/auth/token', SignIn);
router.post('/auth/token/refresh', SignIn);
router.post('/auth/token/verify', SignIn);

// Twilio
router.post('/auth/twilio', twilio);

export default router;
