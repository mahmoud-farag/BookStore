import { REMOVE_FROM_CART } from "../constants/cartConstants";

const cartitems = localStorage.getItem('cartItems',JSON.)
export const RemoveFromCartReducer = (state={cartItems:[]}, action) => {
   console.log('action.payload>>>productId');
   console.log(action.payload);
   console.log(state.cartItems);
    switch (action.type) {
        case REMOVE_FROM_CART:  
            return{
                ...state,
             //return all items on the cartItems except the item which the user clicked it from UI
             cartItems: state.cartItems.filter(item => item.product !== action.payload)
            }
        default:
            return state;
            
    }
}
 
export default RemoveFromCartReducer;
