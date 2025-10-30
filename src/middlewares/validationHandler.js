import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

const handleValidationErros = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array()[0].msg;
    throw new ApiError(400, firstError);
  }
  next();
};

export { handleValidationErros };
