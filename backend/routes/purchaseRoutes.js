import express from 'express';
import { 
  createPurchase, 
  getPurchases, 
  updatePurchaseStatus ,

  updateServiceStatus
} from '../controllers/purchaseController.js';
import { protect ,verifyToken, isAdmin } from '../middlewares/auth.js';

const router = express.Router();



router.post('/', protect, createPurchase);
router.get('/', protect, getPurchases);
router.patch('/:id', protect, updatePurchaseStatus); // Add this line

router.patch('/services/:purchaseId/:serviceIndex', verifyToken, updateServiceStatus);

export default router;