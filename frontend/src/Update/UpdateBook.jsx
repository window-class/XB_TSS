import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateStockIn() {
  const { id } = useParams(); // ItemId
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ItemId: id || '',
    ItemName: '',
    Description: '',
    QuantityIn: '',
    TotalQuantityIn: '',
    SupplierName: '',
    StockInDate: '',
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/getStockInById/${id}`);
        const data = res.data;
        setFormData({
          ItemId: data.ItemId,
          ItemName: data.ItemName || '',
          Description: data.Description || '',
          QuantityIn: data.QuantityIn ?? '',
          TotalQuantityIn: data.TotalQuantityIn ?? '',
          SupplierName: data.SupplierName || '',
          StockInDate: data.StockInDate ? new Date(data.StockInDate).toISOString().slice(0, 16) : '',
        });
      } catch (err) {
        setError(err.response?.data?.msg || err.message);
      }
    };
    if (id) fetchItem();
  }, [id]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const payload = {
        ...formData,
        QuantityIn: Number(formData.QuantityIn),
        TotalQuantityIn: Number(formData.TotalQuantityIn),
        StockInDate: formData.StockInDate ? new Date(formData.StockInDate) : undefined,
      };

      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/updateStockIn/${id}`, payload);
      navigate('/GetStockIn');
    } catch (err) {
      setError(err.response?.data?.msg || err.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200 p-4">
      <div className="w-full max-w-md bg-gray-50 shadow-lg p-6 rounded-lg">
        <h2 className="font-bold text-2xl">Update Stock In</h2>
        {error && <p className="text-red-500 font-medium mt-2">{error}</p>}

        <form onSubmit={onSubmit}>
          <div className="mt-3">
            <label className="block font-medium">ItemId</label>
            <input className="w-full p-2 rounded border" name="ItemId" value={formData.ItemId} disabled />
          </div>

          <div className="mt-3">
            <label className="block font-medium">ItemName</label>
            <input className="w-full p-2 rounded border" name="ItemName" value={formData.ItemName} onChange={onChange} required />
          </div>

          <div className="mt-3">
            <label className="block font-medium">Description</label>
            <input className="w-full p-2 rounded border" name="Description" value={formData.Description} onChange={onChange} />
          </div>

          <div className="mt-3">
            <label className="block font-medium">QuantityIn</label>
            <input type="number" className="w-full p-2 rounded border" name="QuantityIn" value={formData.QuantityIn} onChange={onChange} required />
          </div>

          <div className="mt-3">
            <label className="block font-medium">TotalQuantityIn</label>
            <input type="number" className="w-full p-2 rounded border" name="TotalQuantityIn" value={formData.TotalQuantityIn} onChange={onChange} required />
          </div>

          <div className="mt-3">
            <label className="block font-medium">SupplierName</label>
            <input className="w-full p-2 rounded border" name="SupplierName" value={formData.SupplierName} onChange={onChange} required />
          </div>

          <div className="mt-3">
            <label className="block font-medium">StockInDate</label>
            <input type="datetime-local" className="w-full p-2 rounded border" name="StockInDate" value={formData.StockInDate} onChange={onChange} />
          </div>

          <button type="submit" className="w-full mt-4 bg-blue-500 p-2 text-white font-medium hover:bg-blue-600 rounded">
            Save
          </button>

          <button
            type="button"
            className="w-full mt-2 bg-gray-700 p-2 text-white font-medium hover:bg-gray-800 rounded"
            onClick={() => navigate('/GetStockIn')}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateStockIn;

