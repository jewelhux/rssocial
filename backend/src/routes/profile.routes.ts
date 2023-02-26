import express from 'express';
import { getProfile, searchProfiles, updateProfile } from '../controllers/profile.controller';
import { checkAuth } from '../middleware/checkAuth';
import { uploadImage } from '../middleware/uploadImage';
import { updateProfileSchema } from '../schemas/profile.schema';
import { validate } from '../middleware/validate';

const router = express.Router();

router.get('/', checkAuth, getProfile);
router.get('/all', checkAuth, searchProfiles);
router.put('/', checkAuth, uploadImage('avatar'), validate(updateProfileSchema), updateProfile);

export default router;
