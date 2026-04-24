import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";

function AddBorrower(){
    const [msg, setMsg]=useState("");
    const [msgType, setMsgType]=useState("");
    const navigate = useNavigate();
    const borrowers = {
            BorrowerId:'',
            BorrowerName:'',
            Role:''
      };
const [borrower, setBorrower]=useState(borrowers); 
  const inputHandler = async(e)=>{
    const {name, value} = e.target;
    setBorrower({...borrower, [name]: value});
    console.log(name, value);
  }
  
  const submitForm = async(e)=>{
    e.preventDefault();
   try {
   const res= await axios.post("http://localhost:7000/api/addBorrower", borrower);
        console.log("Borrower added well:", res);
        setMsg("Well register, directing to list page...");
        setMsgType("well");
        setTimeout(()=>{navigate('/GetBorrower');}, 3000);

   } catch (error) {
    console.log("Error adding Borrower:", error);
        setMsg(`Failed to register:${error} 5 secs to refresh...`);
        setMsgType("not");
        setTimeout(()=>{window.location.reload();}, 5000);    
   }  
  }
    return(
        <div className="flex justify-center items-center min-h-screen bg-blue-400">
            <div className="w-2xl p-4 bg-gray-50 shadow-lg rounded-lg">
               <h1 className="font-bold text-2xl p-2">Register Borrower</h1>
               <form onSubmit={submitForm}>
                <div>
                    <label className="block font-medium text-gray-700 mt-2">Borrower Id</label>
                    <input type="text"
                           name="BorrowerId"
                           onChange={inputHandler}
                           placeholder="Enter borrower id..."
                           autoComplete="off"
                           required
                           className="w-full p-2 outline-1 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                           />
                </div>
                <div>
                    <label className="block font-medium text-gray-700 mt-2">Borrower Name</label>
                    <input type="text"
                           name="BorrowerName"
                           placeholder="Enter borrower name..."
                           onChange={inputHandler}
                           autoComplete="off"
                           required
                           className="w-full p-2 outline-1 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                           />
                </div>
                <div>
                <label className="block font-medium text-gray-700 mt-2">Select Role</label>
                <select name="Role" onChange={inputHandler} autoComplete="off" required
                className="w-full p-2 outline-1 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 rounded"
                >
                    <option value="">Select role</option>
                    <option value='Teacher'>Teacher</option>
                    <option value='Trainee'>Trainee</option>
                </select>
                </div>
                <div className={`w-full p-2 mt-2 text-center font-medium 
                              ${msgType =='well'?'text-green-500':'text-red-500'}`}>
                            {msg}
                </div>
                <button type="submit" className="mt-2 p-2 font-medium text-white bg-blue-500 hover:bg-orange-500 rounded">
                    Register</button>&nbsp;&nbsp;
                <Link to="/GetBorrower" className="text-blue-500 hover:underline font-medium text-md">View List</Link>                    
               </form> 
            </div>
        </div>
    )
}

export default AddBorrower;