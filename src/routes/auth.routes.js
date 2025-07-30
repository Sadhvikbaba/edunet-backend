import {Router} from 'express';
import { signup, login, logout , getCurrentUser, getDashboard } from '../controllers/user.controller.js';
import { validateAuth  , authenticateToken} from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/signup', validateAuth, signup);
router.post('/login', validateAuth, login);
router.post('/logout', authenticateToken, logout);
router.get("/get-current-user" , authenticateToken , getCurrentUser);
router.get("/dashboard" , authenticateToken , getDashboard);

export default router;