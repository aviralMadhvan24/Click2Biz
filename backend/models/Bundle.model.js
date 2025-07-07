import mongoose from 'mongoose';
const bundleSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number
});
export default mongoose.model('Bundle', bundleSchema);
