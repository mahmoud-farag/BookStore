import axios from 'axios';

import { USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNOUT } from "../constants/userConstants";


export const  registerAction = (name, email, password)=>async(dispatch)=>{

    dispatch({type:USER_REGISTER_REQUEST, payload: {name, email, password}});

    try{
        const {data} = await axios.post('/api/users/register', {name, email, password});
        // console.log(data);
    
        dispatch({type:USER_REGISTER_SUCCESS, payload: data});
              // upadate the userInfo based on the current registered user.
        dispatch({type:USER_SIGNIN_SUCCESS, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));
    }catch(error){
         dispatch({type:USER_REGISTER_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message  : error.message 
        })
    }
}

export const  signinAction = (email, password)=>async(dispatch)=>{

    dispatch({type:USER_SIGNIN_REQUEST, payload: {email, password}});

    try{
        const {data} = await axios.post('/api/users/signin', {email, password});
        // console.log(data);
        dispatch({type:USER_SIGNIN_SUCCESS, payload: data});
        localStorage.setItem('userInfo', JSON.stringify(data));
    }catch(error){
         dispatch({type:USER_SIGNIN_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message  : error.message 
        })
    }
}


export const signOutAction = ()=>(dispatch)=>{
localStorage.removeItem('userInfo')
localStorage.removeItem('cartItems');
localStorage.removeItem('shippingAddress');

dispatch({type:USER_SIGNOUT})
}