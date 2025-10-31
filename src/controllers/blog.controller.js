import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils//asyncHandler.js";
import Blog from "../models/blog.model.js";

// Impliment express validator
// POST blog by logged in user only
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
    createdBy: req.user,
  });

  const createdBlog = await Blog.findById(newBlog._id).select("-__v");

  return res
    .status(201)
    .json(new ApiResponse(201, createdBlog, "Blog created successfully"));
});

// Get All Blogs by logged in user only
const getAllBlogs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * 10;
  const search = req.query.search || "";
  const userId = req.user.id;

  // Query
  let searchQuery = { createdBy: userId };

  if (search) {
    searchQuery.$text = { $search: search };
  }

  // Count all blogs
  const totalBlogs = await Blog.countDocuments(searchQuery);

  // fetch all blog
  let blogQuery = Blog.find(searchQuery).skip(skip).limit(limit);

  if (search) {
    blogQuery = blogQuery.sort({ score: { $meta: "textScore" } });
  } else {
    blogQuery.sort({ createdAt: -1 });
  }

  const totalPages = Math.ceil(totalBlogs / limit);
  const blogs = await blogQuery;
  const response = {
    blogs: blogs,
    pagination: {
      currentPage: page,
      totalPages: totalPages,
      limit: limit,
      totalBlogs: totalBlogs,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
    search: search || null,
  };
  return res.status(200).json(new ApiResponse(200, response, "All Blogs"));
});

// Get Single Blogs by logged in user only
const getSingleBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id).select("-__v");
  if (!blog) {
    return res.status(404).json(new ApiResponse(404, [], "Blog Not Found"));
  }

  return res.status(200).json(new ApiResponse(200, blog, "Blog Found"));
});
// Update Blogs by logged in user only
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
// deleteBlog by logged in user only
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
