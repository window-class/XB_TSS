import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './App';

function Home() {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <nav className="w-full bg-purple-700 p-4 sticky top-0 z-50 shadow-lg flex justify-between items-center">
        <div className="flex space-x-6">
          <Link to="/AddStockIn" className="text-white font-bold text-xl hover:text-purple-200 transition">
            Stock In
          </Link>
          <Link to="/AddStockOut" className="text-white font-bold text-xl hover:text-purple-200 transition">
            Stock Out
          </Link>
          <Link to="/report" className="text-white font-bold text-xl hover:text-purple-200 transition">
            Report
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="text-white bg-green-600 hover:bg-red-700 px-6 py-2 rounded-full font-bold transition duration-300 shadow-md"
        >
          Logout
        </button>
      </nav>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-lg border-l-8 border-purple-700">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Stock Management System</h2>
            <p className="text-gray-600 leading-relaxed">
              Add stock-in items, record stock-out quantities, and view a consolidated report of all
              inserted data.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-3">Quick Actions</h3>
            <div className="space-y-3">
              <Link to="/AddStockIn" className="block bg-purple-600 text-white px-4 py-3 rounded hover:bg-purple-700 font-semibold">
                Add Stock In
              </Link>
              <Link to="/GetStockIn" className="block bg-blue-600 text-white px-4 py-3 rounded hover:bg-blue-700 font-semibold">
                View Stock In
              </Link>
              <Link to="/AddStockOut" className="block bg-green-600 text-white px-4 py-3 rounded hover:bg-green-700 font-semibold">
                Add Stock Out
              </Link>
              <Link to="/GetStockOut" className="block bg-teal-600 text-white px-4 py-3 rounded hover:bg-teal-700 font-semibold">
                View Stock Out
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;

