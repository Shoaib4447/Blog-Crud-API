import { body } from "express-validator";

const createBlogValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),

  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content is required")
    .isLength({ min: 10, max: 1000 })
    .withMessage("min 10 characters long max 1000 characters"),

  body("author")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Author name should be at least 2 characters long"),
];

const updateBlogValidator = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),

  body("content")
    .optional()
    .trim()
    .isLength({ min: 10 })
    .withMessage("Content must be at least 10 characters long"),

  body("author")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Author name should be at least 2 characters long"),
];

export { createBlogValidator, updateBlogValidator };
