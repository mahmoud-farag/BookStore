import axios from "axios";
import { ADD_TO_CART, SAVE_PAYMENT_METHOD_CART, SAVE_SHIPPING_DATA_CART } from "../constants/cartConstants";
import { REMOVE_FROM_CART } from "../constants/cartConstants";


export const AddToCartAction = (productId, QTY) => async(dispatch,getState)=>{

    const {data} = await axios.get(`/api/products/${productId}`);
       console.log('add to cart data item action');
       console.log(data);
    dispatch({
        type: ADD_TO_CART,
        payload:{
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            QTY,
            product: data._id

        }
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
}



export const RemoveFromCartAction = (productId)=>(dispatch,getState) => {
    
    dispatch({type:REMOVE_FROM_CART, payload:productId})
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
}

export const ShippingAction = (shippingData)=>(dispatch)=>{
    dispatch({type:SAVE_SHIPPING_DATA_CART, payload: shippingData});
    localStorage.setItem('shippingAddress', JSON.stringify(shippingData));
}

export const paymentMethodAction = (paymentMethod)=>(dispatch)=>{

    dispatch({type:SAVE_PAYMENT_METHOD_CART, payload:paymentMethod});
}


