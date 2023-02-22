import express from 'express';
import { getConversations, getMessages, sendMessage } from '../controllers/chat.controller';
import { checkAuth } from '../middleware/checkAuth';
import { validate } from '../middleware/validate';
import { sendMessageSchema, getMessagesSchema } from '../schemas/chat.schema';

const router = express.Router();

router.get('/conversations', checkAuth, getConversations);
router.get('/messages', checkAuth, validate(getMessagesSchema), getMessages);
router.post('/messages', checkAuth, validate(sendMessageSchema), sendMessage);

export default router;
