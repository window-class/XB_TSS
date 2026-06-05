import React from "react";
import { useState, useEffect } from "react";
import axios from 'axios';
import {Link, useParams} from 'react-router';

function GetSupplier() {
    const [suppliers, setSuppliers]=useState([]);

    useEffect(()=>{
         const fetchSuppliers = async()=>{
    const res=await axios.get("http://localhost:7000/api/getSupplier", suppliers);
          setSuppliers(res.data);
          console.log("Found Suppliers:", res);    
         }
         fetchSuppliers();      
    },[]);

 const deleteHandler = async(id)=>{
    axios.delete(`http://localhost:7000/api/deleteSupp/${id}`)
         .then((res)=>{
            setSuppliers((prevSupp)=>prevSupp.filter((supp)=>supp._id !==id));
            console.log("Supplier deleted:", res);
         })
         .catch((error)=>{
            console.log("Error deleting Supplier:", error);
         });
 }  
    
    return(
        <div className="flex justify-center items-center min-h-screen bg-blue-400">
           <div className="w-4xl bg-gray-50 shadow-lg rounded-lg">
             <h1 className="text-2xl font-bold p-2">Suppliers List...</h1>
            <table className="w-full">
              <thead className="text-2xl font-bold bg-blue-500 text-white">
                <tr>
                    <th className="p-2 space-x-2">N<sup>o</sup></th>
                    <th className="p-2 space-x-2">Supplier Id</th>
                    <th className="p-2 space-x-2">Email</th>
                    <th className="p-2 space-x-2">Phone</th>
                    <th className="p-2 space-x-2">Address</th>
                    <th colSpan={2} className="p-2 space-x-2">action</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier, index)=>(
                 <tr key={supplier._id}
                 className="border-b-1 border-gray-500 hover:border-blue-400 hover:bg-gray-200"
                 >
                    <td className="p-2 font-medium text-center">{index +1}</td>
                    <td className="p-2 font-medium">{supplier.SupplierId}</td>
                    <td className="p-2 font-medium">{supplier.Email}</td>
                    <td className="p-2 font-medium">{supplier.Phone}</td>
                    <td className="p-2 font-medium">{supplier.Address}</td>
                    <td className="p-2 font-medium">
                    <Link to={`/UpdateSupplier/`+supplier._id}
                    className="text-white font-medium bg-green-500 hover:bg-orange-600 p-2 rounded cursor-pointer">update</Link>
                    </td>
                    <td className="p-2 font-medium">
                    <button 
                    onClick={()=>{if(window.confirm(`are you ready to delete ${supplier.Email}`)) 
                    deleteHandler(supplier._id)}}
                    className="text-white font-medium bg-red-400 hover:bg-red-600 p-2 rounded cursor-pointer"
                    >delete</button>
                    </td>
                 </tr>   
                ))}
              </tbody>
            </table>
            <div className="w-full p-2 text-center">
              <Link to="/" className="float-right p-2 hover:underline text-blue-500">Home &rarr;</Link>
              <Link to="/AddSupplier" className="float-left p-2 hover:underline text-blue-500">&larr; Add New Supplier</Link>
            </div> 
            </div> 
        </div>
    )
}

export default GetSupplier;