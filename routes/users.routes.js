import express from "express";
import multer from "./../utils/multer_uploader.js";
import { ValidateUser, validateUserUpdate } from "../validators/users.validator.js";
const upload = multer()

import { getAllUsers, addUser, getOneUser, deleteOneUser, updateUser } from './../controllers/users.controller.js'
const router = express.Router()

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *              names:
 *                  type: string
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *              phone:
 *                  type: string
 *              dob:
 *                  type: date
 *              photo:
 *                  type: string
 *          required:
 *              - names
 *              - email
 *              - password
 *              - phone
 *              - dob
 *              - photo
 *              
 */

/**
 * @swagger
 * /users:
 *  get:
 *      summary: Get a list of all users
 *      responses:
 *          '200':
 *              description: All Users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 *          '500': An error occured
 */

router.get('/', getAllUsers)
router.post('/', upload.single('photo'), ValidateUser, addUser)
router.get('/:id', getOneUser)
router.patch('/:id', upload.single('photo'), validateUserUpdate, updateUser)
router.delete("/:id", deleteOneUser)

export default router