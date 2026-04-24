import Book from "../models/BookModel.js";

export const addBook = async (req, res) => {
    try {
       const newBook = await Book.insertMany(req.body);
       res.status(201).json(newBook); 
    } catch (error) {
     res.status(500).json({errMsg: error.message});   
    }
}

export const getBook = async (req, res) => {
    try {
      const foundBook = await Book.find();
      res.status(200).json(foundBook);  
    } catch (error) {
     res.status(500).json({errMsg: error.message});   
    }
}

export const getBookById = async (req, res) => {
    try {
       const {id}=req.params;
       const getBook=await Book.findById(id);
       res.status(200).json(getBook); 
    } catch (error) {
    res.status(500).json({errMsg: error.message});   
    }
}

export const deleteBook = async (req, res) => {
    try {
      const {id} = req.params;
      const deleteBook = await Book.findByIdAndDelete(id);
      res.status(200).json({msg: "Book deleted:", deleteBook});  
    } catch (error) {
    res.status(500).json({errMsg: error.message});    
    }
}

export const updateBook = async (req, res) => {
    try {
       const {id}=req.params;
       const updateOne = await Book.findByIdAndUpdate(id, req.body, {new: true});
       res.status(201).json(updateOne); 
    } catch (error) {
    res.status(500).json({errMsg: error.message});    
    }
}