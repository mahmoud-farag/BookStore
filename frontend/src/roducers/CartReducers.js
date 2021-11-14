import { ADD_TO_CART, CART_EMPTY, REMOVE_FROM_CART, SAVE_PAYMENT_METHOD_CART, SAVE_SHIPPING_DATA_CART } from "../constants/cartConstants";

const cartReducer = (state={cartItems:[]}, action) => {

            
    switch(action.type){
        case ADD_TO_CART:

          //------------first change -----//
            // extract the item from the action payload 
            const item = action.payload;
          
            // check firstly if item exist or not to do one action (add new item, or update an existing one) 
            
            const isItemExist = state.cartItems.find(x=>x.product === item.product)
         //---end first change -----//
                if(isItemExist){
                    // so if item exist just return new state having thge updated property target 'cartItems'
                    return{...state,cartItems: state.cartItems.map(x => x.product === item.product? item : x)}
                }
                else{
                    // if not exist then  return new state having the new item on the 'cartItems' property
                     return{...state,cartItems: [...state.cartItems, item] }   
                };
        case REMOVE_FROM_CART:  
                 return{
                    ...state,
                //return all items on the cartItems except the item which the user clicked it from UI
                cartItems: state.cartItems.filter(item => item.product !== action.payload)
                }
        case SAVE_SHIPPING_DATA_CART:
            return{
                ...state, shippingAddress: action.payload
            }   
        case SAVE_PAYMENT_METHOD_CART:
            return{
                ...state,
                paymentMethod:action.payload
            }    
        case CART_EMPTY:
            return{...state, cartItems:[]}
        default:
           return  state; 
    }
}

export default cartReducer;