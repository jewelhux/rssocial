import express from 'express';
import {
  addPost,
  deletePost,
  getAllPosts,
  getPostsByUser,
  toggleLike
} from '../controllers/post.controller';
import { checkAuth, getUserId } from '../middleware/checkAuth';
import { uploadImage } from '../middleware/uploadImage';
import { addPostSchema, postByIdSchema } from '../schemas/post.schema';
import { validate } from '../middleware/validate';

const router = express.Router();

router.get('/', checkAuth, getPostsByUser);
router.get('/all', getUserId, getAllPosts);
router.post('/', checkAuth, uploadImage('image'), validate(addPostSchema), addPost);
router.delete('/:id', checkAuth, validate(postByIdSchema), deletePost);
router.patch('/:id', checkAuth, validate(postByIdSchema), toggleLike);

export default router;
