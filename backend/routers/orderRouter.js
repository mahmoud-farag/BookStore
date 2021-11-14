import express from 'express';
;
import { getAllOrdersForCurrentUserController, getOrderByIdController, postNewOrderController } from '../controllers/orderControllers.js';

import { isAuth } from '../utils/isAuth.js';

const orderRouter = express.Router();



// get all orders router
orderRouter.route('/getall').get(isAuth, getAllOrdersForCurrentUserController);

// insert new order on the DB  route
orderRouter.route('/').post(isAuth,postNewOrderController);

// getOrderById route
orderRouter.route('/:id').get(isAuth,getOrderByIdController);

 


export default orderRouter;
