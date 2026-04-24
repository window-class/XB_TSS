import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import {Link, useNavigate, useParams} from 'react-router'

function UpdateBook(){
    const [msg, setMsg]=useState("");
    const [msgType, setMsgType]=useState("");
    const navigate = useNavigate();
    const books={
        BookId:'',
        BorrowerId:'',
        SupplierId:'',
        BookType:'',
        Publisher:''
    };
    const [book, setBook]= useState(books);
    const inputHandler = async(e)=>{
        const {name, value} = e.target;
        setBook({...book, [name]: value});
        console.log(name, book);
    }
    const [borrowers, setBorrower]=useState([]);
    useEffect(()=>{
        const fetchBorr = async()=>{
            const res = await axios.get("http://localhost:7000/api/getBorrower", borrowers);
            setBorrower(res.data);
            console.log("Found Array: ", res);
        }
        fetchBorr();
    }, []);

    const [suppliers, setSuppliers]=useState([]);
    useEffect(()=>{
         const fetchSuppliers = async()=>{
    const res=await axios.get("http://localhost:7000/api/getSupplier", suppliers);
          setSuppliers(res.data);
          console.log("Found Suppliers:", res);    
         }
         fetchSuppliers();      
    },[]);

const {id} = useParams();   
useEffect(()=>{
    axios.get(`http://localhost:7000/api/getBookById/${id}`)
    .then((res)=>{
        setBook(res.data);
        console.log("Found Book Is:", res);
    });
},[id]);
 const submitForm = async(e)=>{
    e.preventDefault();
    try {
     const res = await axios.put(`http://localhost:7000/api/updateBook/${id}`, book);
     console.log("Successfully updated:", res);
     setMsg("Book updated successfully, redirect to view page...");
     setMsgType("well");
     setTimeout(()=>{navigate('/GetBook');}, 3000);   
    } catch (error) {
     console.log("Error updating book:", error);
     setMsg(`Failed to edit book: ${error}`);
     setMsgType("not");
     setTimeout(()=>{window.location.reload();}, 5000);   
    }
 }   
    return(
        <div className="flex min-h-screen items-center justify-center bg-blue-400">
         <div className="w-2xl p-4 bg-gray-50 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold p-2 text-black">Update Book</h1>
          <form onSubmit={submitForm}>
           <div>
            <label className="block font-medium text-gray-800">Book Id</label>
            <input type="text" name="BookId" onChange={inputHandler}
                   required autoComplete="off"
                   value={book.BookId}
                   placeholder="Enter book Id..."
                   className="w-full p-2 outline-1 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                   />
            </div>
            <div>       
            <label className="block font-medium text-gray-800">Borrower Id</label>
            <select name="BorrowerId" autoComplete="off" required
                    value={book.BorrowerId}
                    className="w-full p-2 outline-1 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                    onChange={inputHandler}
                   >
            <option value="">Select Borrower Id...</option>
            {borrowers.map((borrower, index)=>(
            <option value={borrower._id} key={borrower._id}>{index +1}. {borrower.BorrowerId}</option>    
            ))}
            </select>
            </div>
            <div> 
            <label className="block font-medium text-gray-800">Supplier Id</label>
            <select name="SupplierId" autoComplete="off" required value={book.SupplierId}
                    className="w-full p-2 outline-1 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                    onChange={inputHandler}
                    >
            <option value="">Select Supplier Id</option>
            {suppliers.map((supplier, index)=>(
            <option value={supplier._id} key={supplier._id}>{index +1}. {supplier.SupplierId}</option>    
            ))}
            </select>
            </div>
            <div>
            <label className="block font-medium text-gray-800">Book Type</label>
            <input type="text" name="BookType" onChange={inputHandler}
                   required autoComplete="off"
                   value={book.BookType}
                   placeholder="Enter book type..."
                   className="w-full p-2 outline-1 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                   />            
            </div>
            <div>
            <label className="block font-medium text-gray-800">Publisher</label>
            <input type="text" name="Publisher" onChange={inputHandler}
                   required autoComplete="off"
                   value={book.Publisher}
                   placeholder="Enter publisher name..."
                   className="w-full p-2 outline-1 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                   />            
            </div>
            <div className={`w-full p-2 font-medium ${msgType=='well'?'text-green-500':'text-red-500'}`}>
                {msg}
            </div>
            <button type="submit" className="mt-2 p-2 bg-green-500 text-white font-medium hover:bg-blue-600 rounded">
                Edit book</button>
            &nbsp;&nbsp;
            <Link to="/GetBook" className="text-blue-500 hover:underline">current books</Link>    
          </form>
         </div>
        </div>
    )
}

export default UpdateBook;