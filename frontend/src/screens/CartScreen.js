import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import {AddToCartAction} from '../actions/cartActions';
import RemoveFromCartAction from '../actions/RemoveFromCartAction';
import MessageBox from '../components/MessagBox';


const CartScreen = (props) => {

   
    const cart =  useSelector(state => state.cart);
    const {cartItems} = cart;

    const dispatch= useDispatch()

    const productId = props.match.params.id;
    const QTY = props.location.search ? Number(props.location.search.split('=')[1]) :1;

    useEffect(()=>{
     //---- SECOND CHANGE-----// 
     if(productId){
      dispatch(AddToCartAction(productId,+QTY));
     }
     //-- END SECOND CHANGE ----//
    },[dispatch,productId, QTY])


    const handleOnClickDeleteBtn=(productId)=>{
        
      dispatch(RemoveFromCartAction(productId));
    }

    const handlOnclickCheckoutBtn= ()=>{
      props.history.push('/signin?redirect=shipping')
    }

    return ( 
       <div className="row top">
         <div className="col-2">
           <h1>Shopping cart</h1>
           {/* render only if the cartItems contains itmes otherwise render Error message */}
           {
             cartItems.length === 0 ?
             (<MessageBox>
               Cart is empty. <Link to='/'>Go To Home</Link>
             </MessageBox>)
             :
             (<ul>
               {cartItems.map(item => (
                 <li key={item.product}>
                   <div className="row">
                      <div>
                        <img
                          src={item.image}
                          alt= {item.name}
                          className='small'
                        ></img>
                      </div>
                      <div className='min-30'>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>
                      <div>
                        <select value={item.QTY} onChange={e=> dispatch(AddToCartAction(item.product, +e.target.value))}>
                                {
                                  [...Array(item.countInStock).keys()].map(key=>(
                                    <option key={key+1} value={key+1}>{key + 1}</option>
                                  ))
                                }
                        </select>
                      </div>
                      <div>
                        ${item.price}
                      </div>
                      <div>
                        <button type='button' onClick={()=>handleOnClickDeleteBtn(item.product)}>Delete</button>
                      </div>
                   </div>
                 </li>
               ))}
             </ul>)
           }
         </div>

         <div className="col-2">
           <div className="cart cart-body cart__screen">
             <ul>
               <li>
                 <h2>
                   Total Items:<span className='total_items'>({cartItems.reduce((accumelator,item)=> accumelator + item.QTY, 0)} Items)</span> ,
                   Total Price: <span className='total_price'> $ {cartItems.reduce((accumelator,item)=> accumelator + item.QTY * item.price, 0)}</span> 
                 </h2>
               </li>
               <li>
                 <button className='primary btn-block' type='button' onClick={handlOnclickCheckoutBtn} disabled={cartItems.length ===0}>
                   Proceed To Checkout
                 </button>
               </li>
             </ul>
           </div>
         </div>
       </div>
     );
}
 
export default CartScreen;
