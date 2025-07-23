import express from 'express';
import { 
  createRazorpayOrder, 
  verifyPayment,
  getPaymentDetails
} from '../controllers/paymentController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.post('/create-order', protect, createRazorpayOrder);
router.post('/verify', protect, verifyPayment);
router.get('/', (req, res) => {
  res.status(400).json({ message: 'Payment ID is required' });
});
router.get('/:paymentId', protect, getPaymentDetails);

export default router;