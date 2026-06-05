import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function GetStockIn() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/getStockIn`);
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
          <h2 className="text-2xl font-bold">Stock In</h2>
          <div className="space-x-3">
            <Link to="/AddStockIn" className="px-4 py-2 rounded bg-purple-600 text-white font-semibold">Add</Link>
            <Link to="/report" className="px-4 py-2 rounded bg-blue-600 text-white font-semibold">Report</Link>
          </div>
        </div>

        {error && <p className="text-red-500 mt-3">{error}</p>}

        <div className="mt-4 bg-white shadow rounded overflow-auto">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 text-left">ItemId</th>
                <th className="p-2 text-left">ItemName</th>
                <th className="p-2 text-left">Description</th>
                <th className="p-2 text-left">QuantityIn</th>
                <th className="p-2 text-left">TotalQuantityIn</th>
                <th className="p-2 text-left">SupplierName</th>
                <th className="p-2 text-left">StockInDate</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id || item.ItemId} className="border-t">
                  <td className="p-2">{item.ItemId}</td>
                  <td className="p-2">{item.ItemName}</td>
                  <td className="p-2">{item.Description}</td>
                  <td className="p-2">{item.QuantityIn}</td>
                  <td className="p-2">{item.TotalQuantityIn}</td>
                  <td className="p-2">{item.SupplierName}</td>
                  <td className="p-2">
                    {item.StockInDate ? new Date(item.StockInDate).toLocaleString() : ''}
                  </td>
                  <td className="p-2">
                    <Link
                      to={`/UpdateStockIn/${item.ItemId}`}
                      className="px-3 py-1 rounded bg-green-600 text-white font-semibold"
                    >
                      Update
                    </Link>
                  </td>
                </tr>
              ))}
              {items.length === 0 && !error && (
                <tr>
                  <td colSpan="8" className="p-4 text-center">No stock-in records</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GetStockIn;

