// routes/supportRoutes.js
import express from 'express';
import { 
  createSupportRequest, 
  getSupportRequests,
  addSupportResponse 
} from '../controllers/supportController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

router.post('/', protect, createSupportRequest);
router.get('/', protect, getSupportRequests);
router.post('/:id/responses', protect, addSupportResponse);

export default router;