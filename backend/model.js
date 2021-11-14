
import data from './data.js';

export const  getProductByID = (id)=>{

    const product = data.products.find((prod)=> prod._id === id);

    return product;

}