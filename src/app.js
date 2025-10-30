import express from "express";
import cors from "cors";
const app = express();
import { errorHandler } from "./middlewares/errorHandler.js";
// common middlewares
// configure  cors frontend url in .env
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// configure static files if required
app.use(express.static("public"));

// import routes
import heathCheckRouter from "./routes/heathCheck.route.js";
import blogsRouter from "./routes/blog.route.js";
import authRouter from "./routes/auth.route.js";

// routes
app.use("/api/v1/heathCheck", heathCheckRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/blogs", blogsRouter);

// error handler should be the last middleware
app.use(errorHandler);
export { app };
