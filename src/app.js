import express from "express";
import cors from "cors";
const app = express();

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

export { app };
