import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import fileUpload from 'express-fileupload';
import supportRoutes from './routes/supportRoutes.js';
import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js'
import purchaseRoutes from './routes/purchaseRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js'; 
dotenv.config();
const router = express.Router();
const app = express();
app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
}));
app.use(cors({
  origin: [
  'https://click2-biz-frontend.vercel.app/',
  'https://click2biz.in',
  'https://www.click2biz.in',
  
  'http://localhost:5173'
],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));




await mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to Click2Biz Database ✅"))
  .catch((err) => console.error(err));

app.use('/api/auth', authRoutes);
app.use("/api", contactRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/payments', paymentRoutes); // Add this


// Add this with your other routes
app.use('/api/support', supportRoutes);
console.log('Razorpay Key:', process.env.RAZORPAY_KEY_ID ? 'Loaded' : 'Missing');

// Add this to your server.js after other route imports


// Add this to your middleware stack
app.use('/api/support', supportRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});