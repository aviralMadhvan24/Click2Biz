// routes/authRoutes.js
import express from 'express';
import { protect, isAdmin } from '../middlewares/auth.js';
import { register, login, logout, verifyPassword } from '../controllers/authController.js';
import { inviteRegister, generateInvite } from '../controllers/inviteController.js';
import { forgotPassword, resetPassword } from '../controllers/authController.js';

// Add to your existing routes

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/verify-password', verifyPassword);

// invite‑only admin signup
router.post('/invite-register', inviteRegister);

// only existing admins can generate new invites
router.post('/generate-invite', protect, isAdmin, generateInvite);

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
