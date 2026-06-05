import express from 'express';
import {
  addStockOut,
  getStockOut,
  getStockOutByItemId,
  updateStockOut,
  deleteStockOut,
} from '../controllers/stockOutController.js';

const router = express.Router();

router.post('/addStockOut', addStockOut);
router.get('/getStockOut', getStockOut);
router.get('/getStockOutByItemId/:id', getStockOutByItemId); // :id = ItemId
router.put('/updateStockOut/:itemId', updateStockOut); // :itemId = ItemId
router.delete('/deleteStockOut/:itemId', deleteStockOut); // :itemId = ItemId

export default router;

