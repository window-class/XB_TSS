import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import { Link } from "react-router-dom";

function Report() {
  const contentRef = useRef(null);
  const handlePrint = useReactToPrint({ contentRef });

  const [reportData, setReportData] = useState({
    stockIn: [],
    stockOut: [],
  });

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/finalReport`
        );
        setReportData(res.data);
      } catch (error) {
        console.log("Failed to fetch report data:", error);
      }
    };
    fetchReport();
  }, []);

  return (
    <div className="flex min-h-screen bg-blue-400 justify-center items-center">
      <div>
        <div className="w-6xl bg-gray-50 shadow-lg rounded-lg" ref={contentRef}>
          <h1 className="text-2xl font-bold p-2">Final Report (SMS)</h1>

          <h2 className="text-xl font-bold p-2">Stock In</h2>
          <table className="w-full">
            <thead className="text-xl bg-purple-600 text-white">
              <tr>
                <th className="p-1">ItemId</th>
                <th className="p-1">ItemName</th>
                <th className="p-1">Description</th>
                <th className="p-1">QuantityIn</th>
                <th className="p-1">TotalQuantityIn</th>
                <th className="p-1">SupplierName</th>
                <th className="p-1">StockInDate</th>
              </tr>
            </thead>
            <tbody>
              {reportData.stockIn.map((item) => (
                <tr
                  key={item._id || item.ItemId}
                  className="border-b cursor-pointer border-gray-800 hover:border-blue-400 hover:bg-gray-200"
                >
                  <td className="p-1 font-medium text-center">{item.ItemId}</td>
                  <td className="p-1 text-blue-700 font-semibold">{item.ItemName}</td>
                  <td className="p-1 text-green-700 font-medium">{item.Description}</td>
                  <td className="p-1 text-purple-700 font-medium">{item.QuantityIn}</td>
                  <td className="p-1 text-purple-700 font-medium">{item.TotalQuantityIn}</td>
                  <td className="p-1 text-slate-600 font-medium">{item.SupplierName}</td>
                  <td className="p-1 text-slate-600 font-medium">
                    {item.StockInDate ? new Date(item.StockInDate).toLocaleString() : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 className="text-xl font-bold p-2">Stock Out</h2>
          <table className="w-full">
            <thead className="text-xl bg-green-600 text-white">
              <tr>
                <th className="p-1">ItemId</th>
                <th className="p-1">QuantityOut</th>
                <th className="p-1">TotalQuantityOut</th>
                <th className="p-1">StockOutDate</th>
              </tr>
            </thead>
            <tbody>
              {reportData.stockOut.map((item) => (
                <tr
                  key={item._id || `${item.ItemId}-${item.StockOutDate}`}
                  className="border-b cursor-pointer border-gray-800 hover:border-blue-400 hover:bg-gray-200"
                >
                  <td className="p-1 font-medium text-center">{item.ItemId}</td>
                  <td className="p-1 text-blue-700 font-semibold">{item.QuantityOut}</td>
                  <td className="p-1 text-purple-700 font-medium">{item.TotalQuantityOut}</td>
                  <td className="p-1 text-slate-600 font-medium">
                    {item.StockOutDate ? new Date(item.StockOutDate).toLocaleString() : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-6xl p-4 mt-4 rounded">
          <button
            onClick={handlePrint}
            className="float-left cursor-pointer p-2 text-white font-medium bg-pink-600 hover:bg-pink-800 rounded"
          >
            Print report
          </button>
          <Link
            to="/"
            className="float-right p-2 text-white font-medium bg-purple-600 hover:bg-purple-800 rounded"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Report;

