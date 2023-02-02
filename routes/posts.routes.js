import express from "express";
import { addComment, getComments } from "./../controllers/comments.controller.js";

import {
  AddLike,
  addPost,
  deletePost,
  getOnePost,
  getPosts,
  updateByID,
} from "../controllers/post.controller.js";
import authenticateRoute from "../middlewares/auth.middleware.js";
import { validateLike, validatePost, validatePostUpdate } from "../validators/posts.validator.js";
import uploadFile from './../utils/multer_uploader.js'
import { validateComment } from "../validators/comments.validator.js";

const upload = uploadFile()

const router = express.Router();



router.get("/", getPosts);
router.post("/", upload.none(), validatePost, authenticateRoute, addPost);
router.get("/:id", getOnePost);
router.delete("/:id", authenticateRoute, deletePost);
router.patch("/:id", upload.none(), validatePostUpdate, authenticateRoute, updateByID);

// Add comment Route
router.post('/:id/comment', upload.none(), validateComment, addComment)
// Get comments of a specific post
router.get('/:id/comment', getComments)

// Add like Route
router.post('/:id/like', upload.none(), validateLike, AddLike)

export default router;
