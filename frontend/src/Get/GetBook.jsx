import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from "react-router";

function GetBook(){
    const [books, setBooks] = useState([]);
  useEffect(()=>{
     const fetchBooks = async()=>{
        axios.get("http://localhost:7000/api/getBook", books)
    .then((res)=>{
        setBooks(res.data);
        console.log("Book List found");
    })
    .catch((error)=>{
        console.log("Failed to load books:", error);
    })    
     }
    fetchBooks(); 
  }, []);
  
  const deleteHandle = async(id)=>{
    axios.delete(`http://localhost:7000/api/deleteBook/${id}`)
    .then((res)=>{
        setBooks((prevBook)=>prevBook.filter((book)=>book._id !==id));
        console.log("book deleted well:", res);
    })
    .catch((error)=>{
        console.log("Error deleting Book:", error);
    })
  }
    return(
      <div className="flex min-h-screen items-center justify-center bg-blue-400">
        <div className="w-6xl bg-gray-50 shadow-lg rounded-lg">
         <h1 className="p-2 text-2xl font-bold">Books Chosen List...</h1>
         <table className="w-full">
            <thead className="bg-blue-500 text-2xl font-bold text-white">
                <tr>
                    <th className="p-2">No</th>
                    <th className="p-2">Book Id</th>
                    <th className="p-2">Borrower Id</th>
                    <th className="p-2">Supplier Id</th>
                    <th className="p-2">Book Type</th>
                    <th className="p-2">Publishers</th>
                    <th colSpan={2} className="p-2">action</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book, index)=>(
            <tr key={book._id} className="border-b-1 border-gray-700 hover:border-blue-400 hover:bg-gray-200">
                <td className="p-2 font-medium">{index +1}</td>
                <td className="p-2">{book.BookId}</td>
                <td className="p-2 text-green-700">{book.BorrowerId}</td>
                <td className="p-2 text-blue-700">{book.SupplierId}</td>
                <td className="p-2">{book.BookType}</td>
                <td className="p-2">{book.Publisher}</td>
                <td className="p-2">
        <button onClick={()=>{if(window.confirm(`ready to delete book published by ${book.Publisher}`)) 
            deleteHandle(book._id)}}
            className="text-white font-medium bg-red-500 p-1 rounded hover:bg-red-700 cursor-pointer"
            >delete</button>            
                </td>
                <td className="p-2">
               <Link to={`/UpdateBook/`+book._id} className="text-white font-medium bg-green-500 p-1 rounded hover:bg-blue-500 cursor-pointer">
              update
              </Link>            
                </td>
            </tr>        
                ))}
            </tbody>
         </table>
        <div className="w-full">
         <Link to="/AddBook" className="text-blue-500 p-2 hover:underline font-medium float-left">&larr;Add New book</Link>
         <Link to="/" className="text-blue-500 p-2 hover:underline font-medium float-right">Home&rarr;</Link>
        </div> 
        </div>
      </div> 
    )
}

export default GetBook;