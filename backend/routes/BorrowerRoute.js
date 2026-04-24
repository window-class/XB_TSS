import express from 'express';

import { addBorrower, getBorrower, getBorrById, deleteBorr, updateBorr } 
       from '../controllers/BorrowerCont.js';

    const borrRoute = express.Router();

          borrRoute.post("/addBorrower", addBorrower);
          borrRoute.get("/getBorrower", getBorrower);
          borrRoute.get("/getBorrById/:id", getBorrById);
          borrRoute.delete("/deleteBorr/:id", deleteBorr);
          borrRoute.put("/updateBorr/:id", updateBorr);
          
    
          export default borrRoute;
    
//Insert: http://localhost:7000/api/addBorrower
//Get:    http://localhost:7000/api/getBorrower
//GetById:http://localhost:7000/api/getBorrById/id
//Delete: http://localhost:7000/api/deleteBorr/id
//Update: http://localhost:7000/api/updateBorr/id