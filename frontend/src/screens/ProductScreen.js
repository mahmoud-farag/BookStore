import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import Rating from '../components/Rating';
import MessageBox from '../components/MessagBox';
import LoadingBox from '../components/LoadingBox';
import { detailsProduct } from '../actions/ProductActions';
import { useSelector,  useDispatch } from 'react-redux';


const ProductScreen= (props)=> {

     //ProductScreen component Hooks
      const[QTY,setQTY]= useState(1);
      const dispatch= useDispatch();
      const productDetails = useSelector(state => state.productDetails);
      const {loading, product, error} = productDetails;

       const productId =props.match.params.id;


    // in every render the detailsProduct reducer will fired inside useEffect
    useEffect(() => {

        dispatch(detailsProduct(productId));

    },[productId,dispatch, props.match.params.id]);


    // handling add to card button .... redirect to card route when button clicked
    const AddToCardHanddler = ()=>{
        props.history.push(`/cart/${productId}?qty=${QTY}`);       
    }
   
    return (
        <div>
        {loading ? 
        (<LoadingBox></LoadingBox>)
        :
        error ? 
          (<MessageBox variant="danger">{error}</MessageBox>)
        :
        ( 

            <div>
            <Link to='/'> Back to Home</Link>
            <div className="row top">
                <div className="col-2">
                    <img className="large" src={product.image} alt={product.name}></img>
                </div>
                <div className="col-1">
                    <ul>
                        <li> {product.name}</li>
                        <li> <Rating rating={product.rating}></Rating></li>
                        <li> Price: {product.price}</li>
                        <li> Description: {product.description}</li>
                    </ul>
                      
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>Price: {product.price} $</li>
                            <li>
                                <div className="row">
                                    <div> status: </div>
                                    {product.countInStock > 0 ?
                                       <span className="success"> In stock</span>
                                      :
                                       <span className="error"> Unavailable</span>
                                      }
                                </div>
                            </li>
                            {/* show add to cart if and only if there is items on stock */}
                             { product.countInStock > 0 && (

                                 <>
                                    <li>
                                        <div className="row">
                                            <div>QTY</div>
                                            <div>
                                            <select value = {QTY} onChange={e=> setQTY(e.target.value)}>
                                             {
                                                 
                                                [...Array(product.countInStock).keys()].map(key =>(
                                                    <option key={key+1} value={key +1}>{key+1}</option>
                                                ))
                                             }
                                            </select>
                                            </div>
                                            
                                        </div>
                                    </li>
                                    <li> <button onClick={AddToCardHanddler} className="primary btn-block"> Add To Card</button></li>
                                 </>
                             )}
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        )
      }
      </div>
    )
}
export default ProductScreen;