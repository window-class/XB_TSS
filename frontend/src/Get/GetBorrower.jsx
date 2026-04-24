import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

function GetBorrower(){
    const [borrowers, setBorrower]=useState([]);
    useEffect(()=>{
        const fetchBorr = async()=>{
            const res = await axios.get("http://localhost:7000/api/getBorrower", borrowers);
            setBorrower(res.data);
            console.log("Found Array: ", res);
        }
        fetchBorr();
    }, []);
 const deleteHandle = async(id)=>{
    axios.delete(`http://localhost:7000/api/deleteBorr/${id}`)
         .then((res)=>{
            setBorrower((prevBorr)=>prevBorr.filter((borr)=>borr._id !==id));
            console.log("Deleted: ", res);
         })
         .catch((error)=>{
            console.log('Failed to delete with error:', error);
         });
 }

    return(
        <div className="flex items-center justify-center min-h-screen bg-blue-400">
            <div className="w-4xl bg-gray-50 shadow-lg rounded-lg">
              <h1 className="text-2xl font-bold p-2">Available Borrowers...</h1>
              <table className="w-full">
                <thead className="bg-blue-500 font-bold text-2xl text-white">
                    <tr>
                        <th className="p-2">N<sup><u>o</u></sup></th>
                        <th className="p-2">Borrower Id</th>
                        <th>Borrower Names</th>
                        <th className="p-2">Roles</th>
                        <th className="p-2" colSpan={2}>action</th>
                    </tr>
                </thead>
                <tbody>
                    {borrowers.map((borrower, index)=>(
                        <tr key={borrower._id}
                        className="border-b-1 border-gray-700 hover:bg-gray-200 hover:border-blue-400"
                        >
                            <td className="p-2 font-medium">{index +1}</td>
                            <td className="p-2 font-medium">{borrower.BorrowerId}</td>
                            <td className="p-2 font-medium">{borrower.BorrowerName}</td>
                            <td className="p-2 font-medium">{borrower.Role}</td>
                            <td className="p-2">
                            <button onClick={()=>{if(window.confirm(`Are you ready to delete ${borrower.BorrowerName}`)) 
                            deleteHandle(borrower._id)}}
                            className="text-white font-medium p-1 bg-red-400 hover:bg-red-700 cursor-pointer rounded"
                            >delete</button></td>
                            <td className="p-2">
                            <Link to={`/UpdateBorrower/`+borrower._id} className="text-white font-medium p-1 bg-blue-400 hover:bg-blue-700 cursor-pointer rounded">update</Link>    
                                </td>
                        </tr>
                    ))}
                </tbody>
              </table>
            <div className="w-full p-2">
             <Link to="/" className="p-2 float-right text-blue-500 hover:underline">Home&rarr;</Link>
             <Link to="/AddBorrower" className="p-2 float-left text-blue-500 hover:underline">&larr;Add New</Link>
            </div>  
            </div>
        </div>
    )
}

export default GetBorrower;