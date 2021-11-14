import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// /api/orders route controller 
const postNewOrderController = (expressAsyncHandler(async(req,res,next)=>{

    if (req.body.orderItems.length === 0) {
        res.status(400).send({ message: 'Cart is empty' });
      } else {
        const order = new Order({
          seller: req.body.orderItems[0].seller,
          orderItems: req.body.orderItems,
          shippingAddress: req.body.shippingAddress,
          paymentMethod: req.body.paymentMethod,
          itemsPrice: req.body.itemsPrice,
          shippingPrice: req.body.shippingPrice,
          taxPrice: req.body.taxPrice,
          totalPrice: req.body.totalPrice,
          user: req.user._id,
        });
        const createdOrder = await order.save();
        res
          .status(201)
          .send({ message: 'New Order Created', order: createdOrder });
      }

      // fire the next route
      next();
}))

 // "/api/orders/:id"  controller
 const getOrderByIdController=(expressAsyncHandler(async(req,res,next)=>{

         const orderId = req.params.id;
        //  console.log(orderId)
         const order = await Order.findById(orderId)
        //  console.log(order)
         if(!order){
             res.status(404).send('order not found plz enter valid ID');
         }else{
            
              res.status(200).send(order);
         }

    // fire the next route
    next();
}))

const getAllOrdersForCurrentUserController = (expressAsyncHandler(async(req,res,next)=>{

  try{
    const orders = await Order.find({user: req.user._id});
      res.status(200).send(orders);
  }catch(error){
    console.log(error);
   res.status(500).send(error.messag)
  }
  



  next();
}))

export {postNewOrderController,getOrderByIdController,getAllOrdersForCurrentUserController}