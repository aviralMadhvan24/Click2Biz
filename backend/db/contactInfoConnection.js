import mongoose from "mongoose";
import dotenv from "dotenv"


dotenv.config();
const contactInfoConnection = await mongoose.createConnection(
   `${process.env.MONGO_URI}contactinfo`
).asPromise();

export default contactInfoConnection;
