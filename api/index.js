import app from "../src/app.js";
import connectDB from "../src/db/index.js";
// connect to db

await connectDB();

// vercel entry point
export default app;
