import express from 'express';
import { register, login, logout, verifyPassword} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/verify-password', verifyPassword);  


export default router;
