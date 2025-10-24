import { Router } from "express";
import { heathCheck } from "../controllers/heathCheck.Controller.js";
const router = Router();

// API heathCheck Route
router.route("/").get(heathCheck);

export default router;
