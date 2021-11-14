import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import generateTokens from '../utils/generateJWT.js';
import data from '../data.js';



//  "api/users/seed"  feed DB by all usrers router controller
const seedController =(expressAsyncHandler(async(req,res, next)=>{
    await User.deleteMany({})
    const createdUsers = await User.insertMany(data.users); 

    res.send(createdUsers);
    next();
}))

//  api/users/register router controller
const registerController= (expressAsyncHandler(async(req,res,next)=>{
        
    try{
        const extractedUser ={
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password,8),
            isAdmin: false,
             }
             console.log(extractedUser)
        const  newUser = new User(extractedUser);
  
        const insertedUser = await newUser.save();
        res.status(200).send(insertedUser)
    }catch(error){
        console.log(error)
        res.status(401).send(error.message)
    }
next()
}))

//  "api/users/signin" >>> route controller
const signinController = (expressAsyncHandler(async(req, res, next)=>{

    const user = await  User.findOne({email:req.body.email});
        
           try{
            if(! user){
                res.status(401).send('wrong credantials plz Enter valid data')
                return;
            }
            else{
                if(bcrypt.compareSync(req.body.password, user.password)){
                    res.status(200).send(
                        {
                            _id: user._id,
                            name:user.name,
                            email: user.email,
                            isAdmin: user.isAdmin,
                            token: generateTokens(user)
                        }
                    )
                }
            }
           }catch(error){
               console.log(error)  
           }

            next()
}))
export {registerController, signinController,seedController};