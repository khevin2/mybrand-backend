import express from "express";
import multer from "./../utils/multer_uploader.js";
import { ValidateUser, validateUserUpdate } from "../validators/users.validator.js";
const upload = multer()

import { getAllUsers, addUser, getOneUser, deleteOneUser, updateUser, getUserByEmail } from './../controllers/users.controller.js'
import authenticateRoute from "../middlewares/auth.middleware.js";
const router = express.Router()



router.get('/', authenticateRoute, getAllUsers)
router.post('/', upload.single('photo'), ValidateUser, addUser)
router.get('/email', authenticateRoute, getUserByEmail)
router.get('/:id', getOneUser)
router.patch('/:id', upload.single('photo'), validateUserUpdate, authenticateRoute, updateUser)
router.delete("/:id", authenticateRoute, deleteOneUser)

export default router