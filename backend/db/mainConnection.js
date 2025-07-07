import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mainConnection = await mongoose.createConnection(process.env.MONGO_URI).asPromise();

export default mainConnection;
