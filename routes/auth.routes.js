import express from "express";
import { auth } from "../controllers/users.controller.js";
import { validatelogin } from "../validators/users.validator.js";
import multer from "./../utils/multer_uploader.js";

const upload = multer();
const router = express.Router();



router.post("/", upload.none(), validatelogin, auth);

export default router;
