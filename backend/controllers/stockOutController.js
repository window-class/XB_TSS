import StockOut from '../models/StockOut.js';

export const addStockOut = async (req, res) => {
  try {
    const { ItemId } = req.body;
    if (!ItemId) return res.status(400).json({ msg: 'ItemId is required' });

    const saved = await StockOut.create(req.body);
    return res.status(201).json(saved);
  } catch (error) {
    return res.status(500).json({ errMsg: error.message });
  }
};

export const getStockOut = async (req, res) => {
  try {
    const found = await StockOut.find().sort({ StockOutDate: -1 });
    return res.status(200).json(found);
  } catch (error) {
    return res.status(500).json({ errMsg: error.message });
  }
};

export const getStockOutByItemId = async (req, res) => {
  try {
    const { id } = req.params; // ItemId
    const found = await StockOut.find({ ItemId: id }).sort({ StockOutDate: -1 });
    return res.status(200).json(found);
  } catch (error) {
    return res.status(500).json({ errMsg: error.message });
  }
};

export const updateStockOut = async (req, res) => {
  try {
    const { itemId } = req.params;
    // Update by ItemId (first match). If you want update by _id, tell me.
    const updated = await StockOut.findOneAndUpdate(
      { ItemId: itemId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ msg: 'StockOut not found' });
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ errMsg: error.message });
  }
};

export const deleteStockOut = async (req, res) => {
  try {
    const { itemId } = req.params;
    const deleted = await StockOut.findOneAndDelete({ ItemId: itemId });
    if (!deleted) return res.status(404).json({ msg: 'StockOut not found' });
    return res.status(200).json({ msg: 'StockOut deleted', deleted });
  } catch (error) {
    return res.status(500).json({ errMsg: error.message });
  }
};

