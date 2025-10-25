import { app } from "../src/app.js";
import connectDB from "../src/db/index.js";

export default async function handler(req, res) {
  try {
    await connectDB(); // connect before handling requests
    return app(req, res); // pass control to Express app
  } catch (error) {
    console.error("❌ Vercel DB connection error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
