import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";

const authenticate = asyncHandler(async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    throw new ApiError(401, "No token,Authorization denied");
  }

  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedUser.id).select("-password");
    if (!user) {
      throw new ApiError(404, "User not found Auth");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Token is not valid");
  }
});
export { authenticate };
