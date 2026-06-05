import StockIn from '../models/StockIn.js';
import StockOut from '../models/StockOut.js';

// Returns all inserted data.
export const report = async (req, res) => {
  try {
    const [stockIn, stockOut] = await Promise.all([
      StockIn.find().sort({ StockInDate: -1 }),
      StockOut.find().sort({ StockOutDate: -1 }),
    ]);

    return res.status(200).json({
      stockIn,
      stockOut,
    });
  } catch (error) {
    return res.status(500).json({ errMsg: error.message });
  }
};

