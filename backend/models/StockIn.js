import mongoose from 'mongoose';

const stockInSchema = new mongoose.Schema(
  {
    ItemId: { type: String, required: true, unique: true },
    ItemName: { type: String, required: true, trim: true },
    Description: { type: String, default: '' },
    QuantityIn: { type: Number, required: true },
    TotalQuantityIn: { type: Number, required: true },
    SupplierName: { type: String, default: '' },
    StockInDate: { type: Date, default: Date.now },
  },
  { collection: 'StockIn' }
);

const StockIn = mongoose.model('StockIn', stockInSchema);
export default StockIn;

