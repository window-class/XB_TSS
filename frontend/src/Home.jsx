import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "./App";

import supp from './images/supp.jpg';
import borr from './images/borr.jpg';
import Lib from './images/Lib.jpg';
import report from './images/report.jpg';

function Home() {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login"); 
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navigation Header */}
      <nav className="w-full bg-purple-700 p-4 sticky top-0 z-50 shadow-lg flex justify-between items-center">
        <div className="flex space-x-6">
          <Link to="/AddSupplier" className="text-white font-bold text-xl hover:text-purple-200 transition">Suppliers</Link>
          <Link to="/AddBorrower" className="text-white font-bold text-xl hover:text-purple-200 transition">Borrowers</Link>
          <Link to="/AddBook" className="text-white font-bold text-xl hover:text-purple-200 transition">Books</Link>
          <Link to="/report" className="text-white font-bold text-xl hover:text-purple-200 transition">Report</Link>
        </div>
        <button
          onClick={handleLogout}
          className="text-white bg-green-600 hover:bg-red-700 px-6 py-2 rounded-full font-bold transition duration-300 shadow-md"
        >
          Logout
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         
          {/* Section 1: Main Feature Image */}
          <div className="group relative overflow-hidden rounded-xl shadow-lg bg-white h-80">
            <Link to="/GetSupplier">
              <img src={Lib} alt="Suppliers" className="w-full h-full object-cover transform group-hover:scale-105 transition duration-500" />
              <div className="absolute bottom-0 left-0 bg-blue-500 bg-opacity-50 w-full p-4">
                <p className="text-white font-bold">Manage Suppliers</p>
              </div>
            </Link>
          </div>

          {/* Section 2: Library Summary Card */}
          <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col justify-center border-l-8 border-purple-700 h-80">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Library Overview</h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to the central management dashboard. Monitor your inventory,
              track active borrowers, and generate real-time reports efficiently.
            </p>
          </div>

          {/* Section 3: Sub-Grid for Quick Links */}
          <div className="grid grid-cols-2 gap-4 h-80">
            <Link to="/GetBorrower" className="relative group overflow-hidden rounded-lg shadow-md">
              <img src={borr} alt="Borrowers" className="w-full h-full object-cover group-hover:opacity-80 transition" />
              <span className="absolute inset-0 flex items-center justify-center text-white font-bold bg-green-500 bg-opacity-20">Borrowers</span>
            </Link>
            <Link to="/GetBook" className="relative group overflow-hidden rounded-lg shadow-md">
              <img src={Lib} alt="Books" className="w-full h-full object-cover group-hover:opacity-80 transition" />
              <span className="absolute inset-0 flex items-center justify-center text-white font-bold bg-purple-700 bg-opacity-20">Library</span>
            </Link>
            <Link to="/report" className="relative group overflow-hidden rounded-lg shadow-md">
              <img src={report} alt="Reports" className="w-full h-full object-cover group-hover:opacity-80 transition" />
              <span className="absolute inset-0 flex items-center justify-center text-white font-bold bg-pink-800 bg-opacity-20">Reports</span>
            </Link>
            <Link to="/GetSupplier" className="relative group overflow-hidden rounded-lg shadow-md">
              <img src={supp} alt="Suppliers" className="w-full h-full object-cover group-hover:opacity-80 transition" />
              <span className="absolute inset-0 flex items-center justify-center text-white font-bold bg-gray-700 bg-opacity-20">Suppliers</span>
            </Link>
          </div>

          {/* Section 4: Secondary Detail Card */}
          <div className="bg-gray-800 text-white p-8 rounded-xl shadow-lg flex flex-col justify-center h-80">
            <h2 className="text-2xl font-semibold mb-2">System Status</h2>
            <div className="space-y-2">
              <p className="flex justify-between border-b border-gray-700 pb-1"><span>Database:</span> <span className="text-green-400">Offline</span></p>
              <p className="flex justify-between border-b border-gray-700 pb-1"><span>Active Users:</span> <span>12</span></p>
              <p className="flex justify-between"><span>Last Backup:</span> <span className="text-gray-400">Always update</span></p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-blue-900 text-white pt-12 pb-6">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold mb-4">Library System</h3>
            <p className="text-blue-200 text-sm">Providing efficient management solutions for modern libraries and inventory tracking for XB_TSS.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="text-blue-200 space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><Link to="/report" className="hover:text-white">Analytics</Link></li>
              <li><Link to="/GetSupplier" className="hover:text-white">Current suppl...</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Support</h3>
            <p className="text-blue-200 text-sm"><a href="jonatha98637726@gmail.com">Mail Us..</a></p>
            <p className="text-blue-200 text-sm"><a href="https://wa.me/+250798637726">+250 798 637 726</a></p>
          </div>
        </div>
        <div className="border-t border-blue-800 mt-8 pt-6 text-center text-blue-300 text-xs">
          &copy; {new Date().getFullYear()} Library Management System. All rights reserved.
        </div>
      </footer>   
    </div>
  );
}

export default Home;