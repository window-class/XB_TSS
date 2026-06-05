import express from 'express';
import {
  addStockIn,
  getStockIn,
  getStockInById,
  updateStockIn,
  deleteStockIn,
} from '../controllers/stockInController.js';

const router = express.Router();

router.post('/addStockIn', addStockIn);
router.get('/getStockIn', getStockIn);
router.get('/getStockInById/:id', getStockInById); // :id = ItemId
router.put('/updateStockIn/:id', updateStockIn); // :id = ItemId
router.delete('/deleteStockIn/:id', deleteStockIn); // :id = ItemId

export default router;

