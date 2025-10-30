import User from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils//asyncHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// POST Register new User
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User Already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const payload = {
    id: newUser._id,
    username: newUser.username,
    email: newUser.email,
  };

  return res
    .status(201)
    .json(new ApiResponse(201, payload, "User Successfully registered"));
});
// Get Login User
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new ApiError(401, "Invalid email or password");
  }
  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password"); // Same message
  }

  const payload = {
    id: existingUser._id,
    username: existingUser.username,
    email: existingUser.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        token,
        user: {
          id: existingUser._id,
          username: existingUser.username,
          email: existingUser.email,
        },
      },
      "Successfully logged in"
    )
  );
});

export { registerUser, loginUser };
