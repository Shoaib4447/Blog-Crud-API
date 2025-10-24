import mongoose from "mongoose";
import { DB_NAME } from "../contants.js";

let isConnected = false; // ✅ track connection state (important for Vercel)

const connectDB = async () => {
  if (isConnected) {
    console.log("⚡ MongoDB already connected");
    return;
  }

  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    isConnected = true;
    console.log(
      `✅ MongoDB connected | Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    throw new Error("Database connection failed");
  }
};

export default connectDB;
