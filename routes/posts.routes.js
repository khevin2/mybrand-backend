import express from "express";

import {
  addPost,
  deletePost,
  getOnePost,
  getPosts,
  updateByID,
} from "../controllers/post.controller.js";
import authenticateRoute from "../middlewares/auth.middleware.js";
import { validatePost, validatePostUpdate } from "../validators/posts.validator.js";
import uploadFile from './../utils/multer_uploader.js'

const upload = uploadFile()

const router = express.Router();



router.get("/", getPosts);


router.post("/", validatePost, authenticateRoute, addPost);


router.get("/:id", getOnePost);
router.delete("/:id", authenticateRoute, deletePost);
router.patch("/:id", validatePostUpdate, authenticateRoute, updateByID);

export default router;
