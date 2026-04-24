import express from 'express'
import { addSupplier, getSupplier, 
         getSupplierById, deleteSupplier, 
         updateSupplier } from '../controllers/SuppCont.js';

const suppRoute = express.Router();
      suppRoute.post("/addSupplier", addSupplier);
      suppRoute.get("/getSupplier", getSupplier);
      suppRoute.get("/getSupplierById/:id", getSupplierById);
      suppRoute.delete("/deleteSupp/:id", deleteSupplier);
      suppRoute.put("/updateSupp/:id", updateSupplier);

      export default suppRoute;
//Get All Suppliers:http://localhost:7000/api/getSupplier
//Get By Id: http://localhost:7000/api/getSupplierById/id
//Delete Supplier: http://localhost:7000/api/deleteSupp/id
//Update Supp: http://localhost:7000/api/updateSupp/id