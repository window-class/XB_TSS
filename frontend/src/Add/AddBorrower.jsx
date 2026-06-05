import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddStockOut() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ItemId: '',
    QuantityOut: '',
    TotalQuantityOut: '',
    StockOutDate: '',
  });

  const [error, setError] = useState(null);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const payload = {
        ...formData,
        QuantityOut: Number(formData.QuantityOut),
        TotalQuantityOut: Number(formData.TotalQuantityOut),
        StockOutDate: formData.StockOutDate ? new Date(formData.StockOutDate) : undefined,
      };

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/addStockOut`, payload);
      navigate('/GetStockOut');
    } catch (err) {
      setError(err.response?.data?.msg || err.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200 p-4">
      <div className="w-full max-w-md bg-gray-50 shadow-lg p-6 rounded-lg">
        <h2 className="font-bold text-2xl">Add Stock Out</h2>
        {error && <p className="text-red-500 font-medium mt-2">{error}</p>}

        <form onSubmit={onSubmit}>
          <div className="mt-3">
            <label className="block font-medium">ItemId</label>
            <input className="w-full p-2 rounded border" name="ItemId" value={formData.ItemId} onChange={onChange} required />
          </div>

          <div className="mt-3">
            <label className="block font-medium">QuantityOut</label>
            <input type="number" className="w-full p-2 rounded border" name="QuantityOut" value={formData.QuantityOut} onChange={onChange} required />
          </div>

          <div className="mt-3">
            <label className="block font-medium">TotalQuantityOut</label>
            <input type="number" className="w-full p-2 rounded border" name="TotalQuantityOut" value={formData.TotalQuantityOut} onChange={onChange} required />
          </div>

          <div className="mt-3">
            <label className="block font-medium">StockOutDate</label>
            <input type="datetime-local" className="w-full p-2 rounded border" name="StockOutDate" value={formData.StockOutDate} onChange={onChange} />
          </div>

          <button type="submit" className="w-full mt-4 bg-green-600 p-2 text-white font-medium hover:bg-green-700 rounded">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddStockOut;

