import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";
dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 8001;

// Run application only if DB is connected
connectDB()
  .then(
    app.listen(PORT, () => {
      console.log(`Server running at PORT:${PORT}`);
    })
  )
  .catch((err) => {
    console.log("MongoDB connection ERROR", err);
  });
