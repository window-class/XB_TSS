import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import suppRoute from './routes/SuppRoute.js';
import borrRoute from './routes/BorrowerRoute.js';
import bookRoute from './routes/BookRoute.js';
import reportRoute from './routes/reportRoute.js';

//Authentication Routes
import authRoutes from './routes/auth.js';

 const app=express();
        
       app.use(express.json());
       app.use(bodyParser.json());
       app.use(cors());
       dotenv.config();
    app.use("/api", suppRoute);
    app.use("/api", borrRoute);
    app.use("/api", bookRoute);
    app.use("/api", reportRoute); //Report middleware.....
    app.use('/api/auth', authRoutes);

    
 const PORT = process.env.PORT || 7070;
 const MONGO = process.env.MONGO;

 mongoose.connect(MONGO)
         .then(()=>{
            console.log(`DB Connected on: ${MONGO}`);
        app.listen(PORT, ()=>{
            console.log(`Server runs on: ${PORT}`);
        })    
         })
         .catch((error)=>{
            console.log("Error running server:", error);
         })