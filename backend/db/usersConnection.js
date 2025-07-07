import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const usersConnection = await mongoose.createConnection(
  `${process.env.MONGO_URI}users`
).asPromise();

export default usersConnection;
