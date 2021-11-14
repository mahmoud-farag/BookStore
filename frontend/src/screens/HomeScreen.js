import React, { useEffect } from 'react';
import {useDispatch, useSelector}  from "react-redux";

import Product from '../components/Product';
// import data from '../data';
// import axios from 'axios';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessagBox';
import { productListAction  } from '../actions/ProductActions';

export default function HomeScreen() {
     
       const dispatch =  useDispatch();
      const productList = useSelector(state => state.productList)

      const {loading, products, error} = productList;
      useEffect(() => {
      
        dispatch(productListAction())
      }, [dispatch])

    return (
    
          <div>
            {loading ? 
            (<LoadingBox></LoadingBox>)
            :
            error ? 
              (<MessageBox variant="danger"></MessageBox>)
            :
            ( <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>)
          }
          </div>
       
    
    )
}

