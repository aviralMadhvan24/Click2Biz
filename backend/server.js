import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';



import authRoutes from './routes/authRoutes.js';
import contactRoutes from './routes/contactRoutes.js'

dotenv.config();
const router = express.Router();
const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', 
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


app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});