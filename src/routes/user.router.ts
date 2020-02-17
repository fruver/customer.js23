import { Router } from 'express';
import { SignUpWithEmailAndPassword } from '../controllers/user.controller';

const router = Router();

router.post('/users', SignUpWithEmailAndPassword);

export default router;
