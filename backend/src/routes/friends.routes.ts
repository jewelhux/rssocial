import express from 'express';
import { checkAuth } from '../middleware/checkAuth';
import { validate } from '../middleware/validate';
import { friendRequest, getFriends } from '../controllers/friends.controller';
import { friendRequestSchema, getFriendsSchema } from '../schemas/friends.schema';

const router = express.Router();

router.get('/', checkAuth, validate(getFriendsSchema), getFriends);
router.post('/', checkAuth, validate(friendRequestSchema), friendRequest);

export default router;
