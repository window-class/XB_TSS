import express from 'express'
import { report } from '../controllers/reportController.js'

const reportRoute = express.Router();
     reportRoute.get("/finalReport", report);
     export default reportRoute;

     //Final report Link: http://localhost:7000/api/finalReport
    
       
                 