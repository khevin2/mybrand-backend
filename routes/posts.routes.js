import express from 'express'

import { addPost, deletePost, getOnePost, getPosts, updateByID } from '../controllers/post.controller.js'
import { validatePost, validatePostUpdate } from '../validators/posts.validator.js'
import uploadFile from './../utils/multer_uploader.js'


const upload = uploadFile()
const router = express.Router()

router.get('/', getPosts)
router.post('/', upload.single('photo'), validatePost, addPost)
router.get('/:id', getOnePost)
router.delete('/:id', deletePost)
router.patch('/:id', upload.single('photo'), validatePostUpdate, updateByID)

export default router