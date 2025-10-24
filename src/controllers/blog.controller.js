import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils//asyncHandler.js";
import Blog from "../models/blog.model.js";

// Impliment express validator

// POST blog
const createBlog = asyncHandler(async (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content) {
    throw new ApiError(400, "Title and content are required");
  }

  const existingBlog = await Blog.findOne({ title });
  if (existingBlog) {
    throw new ApiError(409, "A blog with this title already exists");
  }

  const newBlog = await Blog.create({
    title,
    content,
    author,
  });

  const createdBlog = await Blog.findById(newBlog._id).select("-__v");

  return res
    .status(201)
    .json(new ApiResponse(201, createdBlog, "Blog created successfully"));
});

// Get All Blogs
const getAllBlogs = asyncHandler(async (req, res) => {
  const allBlogs = await Blog.find().lean();
  if (allBlogs.length === 0) {
    return res.status(200).json(new ApiResponse(200, [], "No blogs found yet"));
  }
  const data = {
    totalBlogs: allBlogs.length,
    allBlogs: allBlogs,
  };
  return res.status(200).json(new ApiResponse(200, data, "All Blogs"));
});

// Get Single Blogs
const getSingleBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id).select("-__v");
  if (!blog) {
    return res.status(404).json(new ApiResponse(404, [], "Blog Not Found"));
  }

  return res.status(200).json(new ApiResponse(200, blog, "Blog Found"));
});
// Update Blogs
const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;

  const blogData = {
    title,
    content,
    author,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(id, blogData, {
    new: true,
    runValidators: true,
  });

  if (!updatedBlog) {
    throw new ApiError(404, "Blog not found or update failed");
  }

  return res.status(200).json(new ApiResponse(200, updateBlog, "Updated Blog"));
});
// deleteBlog
const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedBlog = await Blog.findByIdAndDelete(id);

  if (!deletedBlog) {
    throw new ApiError(404, "Blog not found or already deleted");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deletedBlog, "Blog deleted successfully"));
});

export { createBlog, getAllBlogs, getSingleBlog, updateBlog, deleteBlog };
