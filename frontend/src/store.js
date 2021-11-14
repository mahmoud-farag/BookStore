import {applyMiddleware, compose, createStore, combineReducers} from 'redux';
// import data from './data.js';
import thunk  from 'redux-thunk';
import cartReducer from './roducers/CartReducers.js';
import {orderCreateReducer,orderDetailsReducer, orderHistoryReducer} from './roducers/orderReducers.js';

import  {productListProducer,productDetailsReducer} from './roducers/productReducers.js'
import { registerReducer, signinReducer } from './roducers/UserReducers.js';


const initialState = {
     userSignin:{
          userInfo:  localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
     },
     cart: {
          cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
          shippingAddress: localStorage.getItem('shippingAddress') ? 
                           JSON.parse(localStorage.getItem('shippingAddress')): {}, 
          paymentMethod: 'paypal',
     }
};

//  the reducer  transfer the current state to the next state based on the action 
const reducers= combineReducers ({
    productList: productListProducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: signinReducer,
    userRegister: registerReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer, 
    orderHitory :orderHistoryReducer,
      
})

/*
-//  this line used to link between redux and redux chrome Devtools, so you can the 
     see the state changing live on the chrome 
*/
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const  store = createStore(
     reducers, 
     initialState,
     composeEnhancer(applyMiddleware(thunk)) );

export default store;