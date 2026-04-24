import React, { useState } from "react";
import axios from 'axios'
import { Link, useNavigate } from "react-router";

function AddSupplier(){
    const [msg, setMsg]=useState("");
    const [msgType, setMsgType]=useState("");
    const navigate = useNavigate();
    const suppliers={
          SupplierId:'',
          Email:'',
          Phone:'',
          Address:''
    };
    const [supplier, setSupplier]=useState(suppliers);

  const inputHandler = async(e)=>{
    const {name, value} = e.target;
    console.log(name, value);
    setSupplier({...supplier, [name]: value});
  }
//http://localhost:7000/api/addSupplier 
 const submitForm = async(e)=>{
    e.preventDefault();
    try {
       const res = await axios.post("http://localhost:7000/api/addSupplier", supplier);
       console.log("Supplier added well:", res);
       setMsg("Successfully added, directing to get page...");
       setMsgType("well");
       setTimeout(()=>{navigate('/GetSupplier')}, 3000); 
    } catch (error) {
      console.log("Error adding supplier:", error);
      setMsg(`Failed to add supplier: ${error}`);
      setMsgType("not");
      setTimeout(()=>{window.location.reload();}, 5000);  
    }
 }
  
  
    return(
        <div className="flex min-h-screen bg-blue-400 justify-center items-center">
            <div className="w-2xl bg-gray-50 p-4 shadow-lg rounded-lg">
             <h1 className="text-2xl font-bold text-black">Add New Supplier</h1>
             <form onSubmit={submitForm}>
              <div>
                <label className="block font-medium text-gray-800 mt-2">Supplier Id</label>
                <input type="text" name="SupplierId"
                       onChange={inputHandler}
                       autoComplete="off"
                       placeholder="Enter Supplier Id..."
                       required
                       className="w-full p-2 text-gray-700 font-medium outline-1 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                       />
              </div>
              <div>
                <label className="block font-medium text-gray-800 mt-2">Email</label>
                <input type="email" name="Email"
                       onChange={inputHandler}
                       autoComplete="off"
                       placeholder="Enter email..."
                       required
                       className="w-full p-2 text-gray-700 font-medium outline-1 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                       />
              </div>
              <div>
                <label className="block font-medium text-gray-800 mt-2">Phone Number</label>
                <input type="text" name="Phone"
                       onChange={inputHandler}
                       autoComplete="off"
                       placeholder="Enter Supplier Phone..."
                       required
                       className="w-full p-2 text-gray-700 font-medium outline-1 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                       />
              </div>
              <div>
                <label className="block font-medium text-gray-800 mt-2">Address</label>
                <input type="text" name="Address"
                       onChange={inputHandler}
                       autoComplete="off"
                       placeholder="Enter Supplier address..."
                       required
                       className="w-full p-2 text-gray-700 font-medium outline-1 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                       />
              </div>
              <div className={`p-2 w-full font-thin ${msgType =='well' ? 'text-green-500':'text-red-500'}`}>
                 {msg}
              </div>
              <button type="submit" className="mt-2 p-2 text-white bg-blue-500 hover:bg-blue-700 font-medium rounded">Add Supplier</button> 
              <Link to="/GetSupplier" className="block mt-2 text-blue-500 hover:underline">View List</Link>                                         
              </form> 
            </div>
        </div>
    )
}

export default AddSupplier;