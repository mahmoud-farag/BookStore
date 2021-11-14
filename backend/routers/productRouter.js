import express from 'express';
import {    fetchAllPRoductsController, 
            getProductByIdController, 
            productSeedController } from '../controllers/productControllers.js';


const  productRouter = express.Router();

//  ''api/c/seed''   >>> inserting products into db router
productRouter.route('/seed',productSeedController)


//  ''api/products/'' fetching all prodcuts from DB router
productRouter.route('/').get(fetchAllPRoductsController)

// ''api/products/:id'' fetch product by ID router
productRouter.route('/:id').get(getProductByIdController);

export default productRouter; 