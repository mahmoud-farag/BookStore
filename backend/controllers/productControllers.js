import expressAsyncHandler from "express-async-handler";
import data from "../data.js";
import Product from "../models/productmodel.js";



const productSeedController = (expressAsyncHandler(async(req,res,next)=>{
    
    const createdProducts = await Product.insertMany(data.products);
    res.status(200).send({createdProducts});

    next();
}))

// ''api/products/:id'' fetch product by ID controller
const getProductByIdController =(expressAsyncHandler(async(req, res,next)=>{

    const product = await Product.findById(req.params.id);

    if(! product){
        res.status(500).send('product not found plz Enter valid ID');

    }else{
        res.status(200).send(product);
    }
    next();
    
}))

//  ''api/products/'' fetching all prodcuts from DB route controller
const fetchAllPRoductsController = (expressAsyncHandler(async(req,res, next)=>{

    const products = await Product.find({});

    if(!products){

        res.status(500).send('products not found in DB')
    }else{
        res.status(200).send(products);
    }
      
    next();
}))
export {getProductByIdController,fetchAllPRoductsController,productSeedController }