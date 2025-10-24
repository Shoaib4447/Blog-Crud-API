import { Router } from "express";
import {
  createBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";

// ----------------------------------------------------
const router = Router();
// routes
// POST
// GET All Blogs
// Get single blog
// update blog
// delete Blog
// -----------------------------------------------------
router.route("/createBlog").post(createBlog);
router.route("/getAllBlogs").get(getAllBlogs);
router.route("/getSingleBlog/:id").get(getSingleBlog);
router.route("/updateBlog/:id").put(updateBlog);
router.route("/deleteBlog/:id").delete(deleteBlog);
export default router;
