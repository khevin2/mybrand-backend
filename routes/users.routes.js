import express from "express";
import multer from "./../utils/multer_uploader.js";
import { ValidateUser, validateUserUpdate } from "../validators/users.validator.js";
const upload = multer()

import { getAllUsers, addUser, getOneUser, deleteOneUser, updateUser } from './../controllers/users.controller.js'
const router = express.Router()

router.get('/', getAllUsers)
router.post('/', upload.single('photo'), ValidateUser, addUser)
router.get('/:id', getOneUser)
router.patch('/:id', upload.single('photo'), validateUserUpdate, updateUser)
router.delete("/:id", deleteOneUser)

export default router