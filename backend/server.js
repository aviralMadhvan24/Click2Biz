import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';



import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js'
import purchaseRoutes from './routes/purchaseRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js'; 
dotenv.config();
const router = express.Router();
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
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

console.log('Razorpay Key:', process.env.RAZORPAY_KEY_ID ? 'Loaded' : 'Missing');








app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});