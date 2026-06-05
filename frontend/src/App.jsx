import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

import Register from './components/Register';
import Login from './components/Login';

import Home from "./Home";
import AddStockIn from "./Add/AddBook";
import GetStockIn from "./Get/GetBook";
import UpdateStockIn from "./Update/UpdateBook";
import AddStockOut from "./Add/AddBorrower";
import GetStockOut from "./Get/GetBorrower";
import UpdateStockOut from "./Update/UpdateBorrower";
import Report from "./Report";

import { AuthContext, useAuth } from "./authContext";
export { useAuth };




const Protected = () => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["x-auth-token"] = token;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["x-auth-token"];
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setAuthToken(token);
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/api/auth/user`
          );
          setUser(res.data);
          setIsAuthenticated(true);
        } catch {
          setAuthToken(null);
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const loginUser = async (token) => {
    setAuthToken(token);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/user`
      );
      setUser(res.data);
      setIsAuthenticated(true);
      return true;
    } catch {
      setAuthToken(null);
      return false;
    }
  };

  const logoutUser = () => {
    setAuthToken(null);
    setIsAuthenticated(false);
    setUser(null);
  };

const authContextValue = {
    isAuthenticated,
    user,
    loading,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route element={<Protected />}>
            <Route path="/" element={<Home />} />

            <Route path="/AddStockIn" element={<AddStockIn />} />
            <Route path="/GetStockIn" element={<GetStockIn />} />
            <Route path="/UpdateStockIn/:id" element={<UpdateStockIn />} />

            <Route path="/AddStockOut" element={<AddStockOut />} />
            <Route path="/GetStockOut" element={<GetStockOut />} />
            <Route path="/UpdateStockOut/:itemId" element={<UpdateStockOut />} />

            <Route path="/report" element={<Report />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;

