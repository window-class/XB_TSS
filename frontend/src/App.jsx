import React, { createContext, useContext, useState, useEffect } from "react"; 
import axios from "axios"; 
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom"; 

import Register from './components/Register'; 
import Login from './components/Login';

import Home from "./Home";
import AddSupplier from "./Add/AddSupplier";
import GetSupplier from "./Get/GetSupplier";
import UpdateSupplier from "./Update/UpdateSupplier";
import AddBorrower from "./Add/AddBorrower";
import GetBorrower from "./Get/GetBorrower";
import UpdateBorrower from "./Update/UpdateBorrower";
import AddBook from "./Add/AddBook";
import GetBook from "./Get/GetBook";
import UpdateBook from "./Update/UpdateBook";
import Report from "./Report";


const AuthContext = createContext({}); 
export const useAuth = () => useContext(AuthContext); 
//  Protect with Outlet for hihg scalable pages... 
const Protected = () => { 
  const { isAuthenticated, loading } = useAuth(); 
  if (loading) return <div>Loading...</div>; 
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />; 
};

function App(){

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
          const res = await axios.get("http://localhost:7000/api/auth/user"); 
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
// use loginUser function 
const loginUser = async (token) => { 
setAuthToken(token); 
try { 
const res = await axios.get("http://localhost:7000/api/auth/user"); 
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
    loginUser,   // again use loginUser and logoutUser functions 
    logoutUser, 
  };

  return(
       <AuthContext.Provider value={authContextValue}> 
       <BrowserRouter>
       <Routes>
          <Route path="/register" element={<Register />} /> 
          <Route path="/login" element={<Login />} /> 

        <Route element={<Protected />}> 
        <Route path="/" element={<Home />} />
        <Route path="/AddSupplier" element={<AddSupplier />} />
        <Route path="/GetSupplier" element={<GetSupplier/>} />
        <Route path="/UpdateSupplier/:id" element={<UpdateSupplier />} />

        <Route path="/AddBorrower" element={<AddBorrower />} />
        <Route path="/GetBorrower" element={<GetBorrower />} />
        <Route path="/UpdateBorrower/:id" element={<UpdateBorrower />} />

        <Route path="/AddBook" element={<AddBook />} />
        <Route path="/GetBook" element={<GetBook />} />
        <Route path="/UpdateBook/:id" element={<UpdateBook />} />

        <Route path="/report" element={<Report />} />
        </Route>
       </Routes>
       </BrowserRouter>
       </AuthContext.Provider>  
  )
}

export default App;