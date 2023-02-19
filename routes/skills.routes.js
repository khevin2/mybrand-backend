import express from "express";
import { addSkill, deleteSkill, getSkillById, getSkills, updateSkill } from "../controllers/skills.controller.js";
import authenticateRoute from "../middlewares/auth.middleware.js";
import { validateAddSkill, validateDelete, validateUpdateskill } from "../validators/skills.validator.js";
import multer from "./../utils/multer_uploader.js"

const router = express.Router()
const upload = multer()

router.post('/', upload.none(), validateAddSkill, authenticateRoute, addSkill)
router.get('/:id', getSkillById)
router.get('/', getSkills)
router.patch('/:id', upload.none(), authenticateRoute, validateUpdateskill, updateSkill)
router.delete('/:id', validateDelete, authenticateRoute, deleteSkill)


export default router