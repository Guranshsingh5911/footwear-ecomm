import express from 'express';
import {
	login,
	register,
	getUserProfile,
	updateUserProfile
} from '../../controllers/auth.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', register);
router.post('/login', login);

router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);

export default router;