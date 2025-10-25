import mongoose from "mongoose";
import { DB_NAME } from "../contants.js";

let isConnected = false; // Track connection state

const connectDB = async () => {
  if (isConnected) {
    console.log("MongoDB already connected 🚀");
    return;
  }

  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    isConnected = true;
    console.log(
      `MongoDB connected ✅ | Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
