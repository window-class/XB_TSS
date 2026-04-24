import React, { useEffect, useRef, useState } from "react";
import {useReactToPrint} from 'react-to-print';
import axios from "axios";
import { Link } from "react-router";

function Report(){
     
    const contentRef = useRef(null);
    const handlePrint = useReactToPrint({
        contentRef,
    });

    const [reportData, setReportData] = useState([]);
  useEffect(()=>{
    const fetchReport = async()=>{
        axios.get("http://localhost:7000/api/finalReport", reportData)
        .then((res)=>{
            setReportData(res.data);
            console.log("Report data are found:", res);
        })
        .catch((error)=>{
            console.log("Failed to road report data:", error);
        })
    }
    fetchReport();
  },[]);  
    return(
        <div className="flex min-h-screen bg-blue-400 justify-center items-center">
        <div>                
          <div className="w-6xl bg-gray-50 shadow-lg rounded-lg" ref={contentRef}>
            <h1 className="text-2xl font-bold p-2">To day's Final Report...</h1>
            <table className="w-full">
                <thead className="text-xl bg-blue-500 text-white">
                    <tr>
                        <th className="p-1">No</th>
                        <th className="p-1">Email</th>
                        <th className="p-1">Phone</th>
                        <th className="p-1">Address</th>
                        <th className="p-1">Borr Name</th>
                        <th className="p-1">Role</th>
                        <th className="p-1">Book Id</th>
                        <th className="p-1">Book Type</th>
                        <th className="p-1">Publisher</th>
                    </tr>
                </thead>
                <tbody>
                    {reportData.map((item, index)=>(
                <tr key={item} className="border-b-1 cursor-pointer border-gray-800 hover:border-blue-400 hover:bg-gray-200">
                    <td className="p-1 font-medium text-center">{index +1}</td>
                    <td className="p-1 text-blue-700 font-semibold">{item.Email}</td>
                    <td className="p-1 text-green-700 font-medium">{item.Phone}</td>
                    <td className="p-1 text-pink-800 font-medium">{item.Address}</td>
                    <td className="p-1 text-blue-700 font-semibold">{item.BorrowerName}</td>
                    <td className="p-1 text-slate-500 font-medium">{item.Role}</td>
                    <td className="p-1 text-purple-700 font-medium">{item.BookId}</td>
                    <td className="p-1 text-purple-700 font-medium">{item.BookType}</td>
                    <td className="p-1 text-slate-500 font-medium">{item.Publisher}</td>
                </tr>        
                    ))}
                </tbody>
            </table>
          </div>
          <div className="w-6xl p-4 mt-4 rounded">
          <button onClick={handlePrint} className="float-left cursor-pointer p-2 text-white font-medium bg-pink-600 hover:bg-pink-800 rounded">Print report</button>
          <Link to="/" className="float-right p-2 text-white font-medium bg-purple-600 hover:bg-purple-800 rounded">Home</Link>
          </div>          
        </div>
        </div>
    )
}

export default Report;