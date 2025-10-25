import { app } from "../src/app.js";
import connectDB from "../src/db/index.js";

// Connect to MongoDB once before exporting the handler
await connectDB();

export default app;
