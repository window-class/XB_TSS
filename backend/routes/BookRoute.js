import express from 'express';

import {
    addBook, getBook, getBookById, deleteBook, updateBook
} from '../controllers/BookCont.js';

const bookRoute = express.Router();
      
     bookRoute.post("/addBook", addBook);
     bookRoute.get("/getBook", getBook);
     bookRoute.get("/getBookById/:id", getBookById);
     bookRoute.delete("/deleteBook/:id", deleteBook);
     bookRoute.put("/updateBook/:id", updateBook);

     export default bookRoute;
//Insert:  http://localhost:7000/api/addBook
//Get:     http://localhost:7000/api/getBook
//GetById: http://localhost:7000/api/getBookById/id
//Delete:  http://localhost:7000/api/deleteBook/id
//Update:  http://localhost:7000/api/updateBook/id
