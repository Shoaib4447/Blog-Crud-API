import { Router } from "express";
import {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import {
  createBlogValidator,
  updateBlogValidator,
} from "../validator/blog.validator.js";
import { handleValidationErros } from "../middlewares/validationHandler.js";
// ----------------------------------------------------
const router = Router();
// routes
// POST
// GET All Blogs
// Get single blog
// update blog
// delete Blog
// -----------------------------------------------------
router.use(authenticate);
router
  .route("/createBlog")
  .post(createBlogValidator, handleValidationErros, createBlog);
router.route("/getAllBlogs").get(getAllBlogs);
router.route("/getSingleBlog/:id").get(getSingleBlog);
router
  .route("/updateBlog/:id")
  .put(updateBlogValidator, handleValidationErros, updateBlog);
router.route("/deleteBlog/:id").delete(deleteBlog);
export default router;
