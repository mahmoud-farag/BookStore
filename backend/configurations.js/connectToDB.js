import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

 export const connectToDb = (uri)=>{
    mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
   })
mongoose.connection.once('open',()=>{
    console.log('DB connection has established...lets beging the party ');
}).on('error',error=>{
    console.log('connection error...', error);
})


 }
 

