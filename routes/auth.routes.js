import express from "express";
import { auth } from "../controllers/users.controller.js";
const router = express.Router()

router.post('/', auth)


export default router