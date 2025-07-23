import express from 'express';
import { 
  createPurchase, 
  getPurchases, 
  updatePurchaseStatus 
} from '../controllers/purchaseController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();



router.post('/', protect, createPurchase);
router.get('/', protect, getPurchases);
router.patch('/:id', protect, updatePurchaseStatus); // Add this line

export default router;