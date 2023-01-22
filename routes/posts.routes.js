import express from 'express'

import { addPost, deletePost, getOnePost, getPosts, updateByID } from '../controllers/post.controller.js'


const router = express.Router()

router.get('/', getPosts)
router.post('/', addPost)
router.get('/:id', getOnePost)
router.delete('/:id', deletePost)
router.patch('/:id', updateByID)

export default router