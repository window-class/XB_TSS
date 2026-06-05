import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function GetStockOut() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/getStockOut`);
        setItems(res.data);
      } catch (err) {
        setError(err.response?.data?.msg || err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Stock Out</h2>
          <div className="space-x-3">
            <Link to="/AddStockOut" className="px-4 py-2 rounded bg-purple-600 text-white font-semibold">Add</Link>
            <Link to="/report" className="px-4 py-2 rounded bg-blue-600 text-white font-semibold">Report</Link>
          </div>
        </div>

        {error && <p className="text-red-500 mt-3">{error}</p>}

        <div className="mt-4 bg-white shadow rounded overflow-auto">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 text-left">ItemId</th>
                <th className="p-2 text-left">QuantityOut</th>
                <th className="p-2 text-left">TotalQuantityOut</th>
                <th className="p-2 text-left">StockOutDate</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id || `${item.ItemId}-${item.StockOutDate}`} className="border-t">
                  <td className="p-2">{item.ItemId}</td>
                  <td className="p-2">{item.QuantityOut}</td>
                  <td className="p-2">{item.TotalQuantityOut}</td>
                  <td className="p-2">{item.StockOutDate ? new Date(item.StockOutDate).toLocaleString() : ''}</td>
                  <td className="p-2">
                    <Link
                      to={`/UpdateStockOut/${item.ItemId}`}
                      className="px-3 py-1 rounded bg-green-600 text-white font-semibold"
                    >
                      Update
                    </Link>
                  </td>
                </tr>
              ))}
              {items.length === 0 && !error && (
                <tr>
                  <td colSpan="5" className="p-4 text-center">No stock-out records</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GetStockOut;

