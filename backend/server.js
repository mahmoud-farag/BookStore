// const express = require('express'),
import express from 'express';

//customisble modules
import {connectToDb} from './configurations.js/connectToDB.js';
import userRouter from './routers/userRouter.js'
import expressAsyncHandler from 'express-async-handler';

import cors from 'cors';
import dotenv from 'dotenv';
import productRouter from './routers/productRouter.js';
import setCors from './utils/cors.js';
import orderRouter from './routers/orderRouter.js';

 const app = express(), 

        // change port mnumber based on the envirenment variables
       port= process.env.PORT || 4000;
        dotenv.config();
        // change DB uri depending on the enviremnet variables >>>>> producrtion or develpment
        const DB_URI = process.env.DB_URI_DEVELOPMENT || process.env.MONGODB_URL ;

        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));

        // set cross origins 
        app.use((req,res,next)=>{
            setCors(req,res,next)
        });

   // connect to the db   
        connectToDb(DB_URI);

// /api/products >>> routes 
app.use('/api/products', productRouter)

// /api/users >>> route
app.use('/api/users', userRouter)

// /api/orders >>> route
app.use('/api/orders', orderRouter)


app.get('/api/config/paypal',expressAsyncHandler((req,res,next)=>{
     const  IsPaypalIdExist = process.env.PAYPAL_ID? process.env.PAYPAL_ID: 'sandbox';
    res.send(IsPaypalIdExist)
    //fire the next route
    next();
}))
// error handlers >>> route
// app.use((error, req,res, next)=>{

//     res.status(500).send({message: error.message})
//     next();
// })
app.listen(port , ()=>{
    console.log(`server is up now on ${port}`);
})