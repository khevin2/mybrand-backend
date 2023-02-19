import express from "express";
import { addWork, deleteWork, getWorkById, getWorks, updateWork } from "../controllers/works.controller.js";
import authenticateRoute from "../middlewares/auth.middleware.js";
import { validateAddWork, validateDelete, validateUpdateWork } from "../validators/works.validator.js";
import multer from "./../utils/multer_uploader.js"

const router = express.Router()
const upload = multer()

router.post('/', upload.none(), validateAddWork, authenticateRoute, addWork)
router.get('/:id', getWorkById)
router.get('/', getWorks)
router.patch('/:id', upload.none(), authenticateRoute, validateUpdateWork, updateWork)
router.delete('/:id', validateDelete, authenticateRoute, deleteWork)


export default router