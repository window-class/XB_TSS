import express from 'express';
import { report } from '../controllers/reportController.js';

const router = express.Router();

router.get('/finalReport', report);

export default router;

