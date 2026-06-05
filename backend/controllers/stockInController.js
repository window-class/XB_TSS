import StockIn from '../models/StockIn.js';

export const addStockIn = async (req, res) => {
  try {
    const { ItemId } = req.body;
    if (!ItemId) return res.status(400).json({ msg: 'ItemId is required' });

    const exists = await StockIn.findOne({ ItemId });
    if (exists) return res.status(400).json({ msg: 'StockIn for this ItemId already exists' });

    const saved = await StockIn.create(req.body);
    return res.status(201).json(saved);
  } catch (error) {
    return res.status(500).json({ errMsg: error.message });
  }
};

export const getStockIn = async (req, res) => {
  try {
    const found = await StockIn.find().sort({ StockInDate: -1 });
    return res.status(200).json(found);
  } catch (error) {
    return res.status(500).json({ errMsg: error.message });
  }
};

export const getStockInById = async (req, res) => {
  try {
    const { id } = req.params; // ItemId
    const found = await StockIn.findOne({ ItemId: id });
    if (!found) return res.status(404).json({ msg: 'StockIn not found' });
    return res.status(200).json(found);
  } catch (error) {
    return res.status(500).json({ errMsg: error.message });
  }
};

export const updateStockIn = async (req, res) => {
  try {
    const { id } = req.params; // ItemId
    const updated = await StockIn.findOneAndUpdate(
      { ItemId: id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ msg: 'StockIn not found' });
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ errMsg: error.message });
  }
};

export const deleteStockIn = async (req, res) => {
  try {
    const { id } = req.params; // ItemId
    const deleted = await StockIn.findOneAndDelete({ ItemId: id });
    if (!deleted) return res.status(404).json({ msg: 'StockIn not found' });
    return res.status(200).json({ msg: 'StockIn deleted', deleted });
  } catch (error) {
    return res.status(500).json({ errMsg: error.message });
  }
};

