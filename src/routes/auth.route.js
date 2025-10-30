import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";
import {
  registerValidator,
  loginValidator,
} from "../validator/auth.validator.js";
import { handleValidationErros } from "../middlewares/validationHandler.js";

const router = Router();

router.post(
  "/register",
  registerValidator,
  handleValidationErros,
  registerUser
);
router.post("/login", loginValidator, handleValidationErros, loginUser);

export default router;
