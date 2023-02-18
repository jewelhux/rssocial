import express from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/auth.controller';
import { checkAuth } from '../middleware/checkAuth';
import { validate } from '../middleware/validate';
import { loginUserSchema, registerUserSchema } from '../schemas/user.schema';

const router = express.Router();

router.post('/register', validate(registerUserSchema), registerUser);
router.post('/login', validate(loginUserSchema), loginUser);
router.post('/logout', checkAuth, logoutUser);

export default router;
