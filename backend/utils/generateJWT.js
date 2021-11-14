import jwt from 'jsonwebtoken';



const generateTokens = (user)=>{
 
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
    }, process.env.JWT_SECRET ||  'someThingSecrets',{
        expiresIn:'30d'
    })

}

export default generateTokens;