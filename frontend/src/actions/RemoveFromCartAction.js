import { REMOVE_FROM_CART } from "../constants/cartConstants";


export const RemoveFromCartAction = (productId)=>(dispatch,getState) => {
    
    dispatch({type:REMOVE_FROM_CART, payload:productId})
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
}
 
export default RemoveFromCartAction;