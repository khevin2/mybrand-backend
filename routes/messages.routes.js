import express from 'express';
import { createMessage, deleteMessage, getMessages, replyMessage } from '../controllers/messages.controller.js';
import authenticateRoute from '../middlewares/auth.middleware.js';
import multer from '../utils/multer_uploader.js';
import { validateDeleteMessage, validateMessage, validateReply } from '../validators/messages.validator.js';

const router = express.Router();
const upload = multer()

router.post('/', upload.none(), validateMessage, createMessage)
router.get('/', authenticateRoute, getMessages)
router.patch('/:id', upload.none(), authenticateRoute, validateReply, replyMessage)
router.delete('/:id', upload.none(), authenticateRoute, validateDeleteMessage, deleteMessage)


export default router