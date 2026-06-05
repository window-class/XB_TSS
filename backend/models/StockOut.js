import mongoose from 'mongoose';

const stockOutSchema = new mongoose.Schema(
  {
    ItemId: { type: String, required: true },
    QuantityOut: { type: Number, required: true },
    TotalQuantityOut: { type: Number, required: true },
    StockOutDate: { type: Date, default: Date.now },
  },
  { collection: 'StockOut' }
);

const StockOut = mongoose.model('StockOut', stockOutSchema);
export default StockOut;

