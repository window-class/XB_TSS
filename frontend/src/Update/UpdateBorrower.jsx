import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateStockOut() {
  const { itemId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ItemId: itemId || '',
    QuantityOut: '',
    TotalQuantityOut: '',
    StockOutDate: '',
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/getStockOutByItemId/${itemId}`
        );
        const list = res.data || [];
        const first = list[0];

        if (!first) return;

        setFormData({
          ItemId: first.ItemId,
          QuantityOut: first.QuantityOut ?? '',
          TotalQuantityOut: first.TotalQuantityOut ?? '',
          StockOutDate: first.StockOutDate ? new Date(first.StockOutDate).toISOString().slice(0, 16) : '',
        });
      } catch (err) {
        setError(err.response?.data?.msg || err.message);
      }
    };

    if (itemId) fetchItem();
  }, [itemId]);

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

      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/updateStockOut/${itemId}`,
        payload
      );

      navigate('/GetStockOut');
    } catch (err) {
      setError(err.response?.data?.msg || err.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200 p-4">
      <div className="w-full max-w-md bg-gray-50 shadow-lg p-6 rounded-lg">
        <h2 className="font-bold text-2xl">Update Stock Out</h2>
        {error && <p className="text-red-500 font-medium mt-2">{error}</p>}

        <form onSubmit={onSubmit}>
          <div className="mt-3">
            <label className="block font-medium">ItemId</label>
            <input className="w-full p-2 rounded border" name="ItemId" value={formData.ItemId} disabled />
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

export default UpdateStockOut;

