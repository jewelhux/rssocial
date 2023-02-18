import express from 'express';
import { addPost, deletePost, getAllPosts, getPostsByUser } from '../controllers/post.controller';
import { checkAuth } from '../middleware/checkAuth';
import { uploadImage } from '../middleware/uploadImage';
import { addPostSchema, deletePostSchema } from '../schemas/post.schema';
import { validate } from '../middleware/validate';

const router = express.Router();

router.get('/', checkAuth, getPostsByUser);
router.get('/all', getAllPosts);
router.post('/', checkAuth, uploadImage, validate(addPostSchema), addPost);
router.delete('/:id', checkAuth, validate(deletePostSchema), deletePost);

export default router;
