import express from 'express';
import {registerController, signinController,seedController} from '../controllers/userControllers.js'



const userRouter = express.Router();

//  '/api/users/seed'  inserting  group of users   into DB
userRouter.route('/seed').get(seedController);

// ''/api/users/signin'' siging in  route
userRouter.route("/signin").post(signinController);

// "/api/users/register"  register route
userRouter.route("/register").post(registerController);

export default userRouter;