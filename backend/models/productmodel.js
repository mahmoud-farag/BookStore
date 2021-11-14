import mongoose from 'mongoose';

const productSchema =  new mongoose.Schema(
    {
        // _id: {type:String, required:true, unique:true},
        name: { type: String, required: true, unique: true },
        // seller: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
        image: { type: String, required: true },
        // brand: { type: String, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true },
        brand:{type:String, required:true},
        rating: { type: Number, required: true },
        numReviews: { type: Number, required: true },
        // reviews: [reviewSchema],
    },{timestamps:true})

const Product = mongoose.model('Products', productSchema);

export default Product;