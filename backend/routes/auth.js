import express from 'express';  
import authController from '../controllers/authController.js';  
import auth from '../middleware/auth.js'; 
// Our authentication middleware ↑ 
const router = express.Router();  

router.post('/register', authController.register);  
 
router.post('/login', authController.login);  
 
router.get('/user', auth, authController.getAuthenticatedUser); 
// 'auth' middleware protects this route  
export default router;