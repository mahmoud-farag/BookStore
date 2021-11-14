import axios from 'axios';
import expressAsyncHandler from 'express-async-handler';
import React from 'react'
import { useSelector } from 'react-redux';
import { CART_EMPTY } from '../constants/cartConstants';
import { ORDER_CREATE_FAIL, ORDER_CREATE_SUCCESS,ORDER_CREATE_REQUEST, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_HISTORY_REQUEST, ORDER_HISTORY_SUCCESS, ORDER_HISTORY_FAIL } from '../constants/orderConstants';


export const createOrderAction=(orderData)=>async (dispatch, getState)=>{

   dispatch({type:ORDER_CREATE_REQUEST, payload:orderData});

      
      try{  

        const {userSignin:{userInfo}} = getState();
    
        const  {data} =  await axios.post('/api/orders',orderData,{
                headers:{
                    authorization: `Bearer ${userInfo.token}`,
                }
            })
            dispatch({type:ORDER_CREATE_SUCCESS, payload:data.order});
            dispatch({type:CART_EMPTY})
            localStorage.removeItem('cartItems');

      }catch(error){
          dispatch({type:ORDER_CREATE_FAIL, 
            payload:
            error.response && error.response.data.message? error.response.data.message : error.message
        })
      }

} 
 export const detailsOrderAction = (orderId)=> async(dispatch,getState)=>{
        dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await axios.get(`/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });     
      
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
    }
}


export const orderHistoryAction = ()=>async(dispatch, getState)=>{

  dispatch({type:ORDER_HISTORY_REQUEST});
  const {userSignin: { userInfo }, } = getState();
  try{
       const {data} =  await axios.get('/api/orders/getall',{ headers: { Authorization: `Bearer ${userInfo.token}` },});
       dispatch({type:ORDER_HISTORY_SUCCESS, payload:data})

  }catch(error){
    dispatch({type:ORDER_HISTORY_FAIL, 
      payload:
      error.response && error.response.data.message? error.response.data.message : error.message
  })
  }

}

// export {createOrderAction, detailsOrder}