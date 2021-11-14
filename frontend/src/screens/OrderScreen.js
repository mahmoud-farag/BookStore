 
import axios from "axios";
import {PayPalButton} from 'react-paypal-button-v2';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";


import { detailsOrderAction } from "../actions/OrderActions.js";
import LoadingBox from "../components/LoadingBox.js";
import MessageBox from "../components/MessagBox.js";


export default function OrderScreen (props){

    const dispatch = useDispatch();
    const [sdkReady, setSdkReady] = useState(false)
   
    const orderId =props.match.params.id;
    // const cart = useSelector(state => state.cart);
    // const {cartItems} = cart;
   
      const orderDetails = useSelector(state => state.orderDetails);
        const {loading, order, error} =orderDetails;
        const addPaypalScript = async()=>{
            const {data} =   await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type= 'text/javascript';
            script.src= `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async= true;
            script.onload=()=>{
                setSdkReady(true);
            }

            document.body.appendChild(script)  
        }// end of addPaypalScript func

    useEffect(() => {
        
        if(!order){
            dispatch(detailsOrderAction(orderId));
        }else{
            if(!order.isPaid){
                if(!window.paypal){
                    addPaypalScript()
                }else{
                    setSdkReady(true);
                }
            }
        }
        
    }, [dispatch, orderId, order]);
 

     const successPaymendHandler= ()=>{
        // do SomeStuff here
     }



    return(

        loading ? (<LoadingBox></LoadingBox>)
        :
        error? (<MessageBox variant="danger">{error}</MessageBox>)    
        :
        (
          <div>
            <h2>order ID: {order._id}</h2>
            <div className="row top">
                    <div className="col-2">
                    <ul>
                        <li>
                        <div className="card card-body">
                            <h2>Shipping</h2>
                            <p>
                            <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                            <strong>Address: </strong> {order.shippingAddress.address},
                            {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                            ,{order.shippingAddress.country}
                            </p>
                            {
                                order.isDelivered?
                                 (<MessageBox variant="success"> Delivered at {order.createdAt}</MessageBox>)
                                :
                                (<MessageBox variant="danger">Not Delivered</MessageBox>)

                            }
                        </div>
                        </li>
                        <li>
                        <div className="card card-body">
                            <h2>Payment</h2>
                            <p>
                            <strong>Method:</strong> {order.paymentMethod}
                            </p>
                            {
                                order.isPaid?
                                 (<MessageBox variant="success"> Paid At {order.createdAt}</MessageBox>)
                                :
                                (<MessageBox variant="danger">Not Paid</MessageBox>)

                            }
                        </div>
                        </li>
                        <li>
                        <div className="card card-body">
                            <h2>Order Items</h2>
                            <ul>
                            {order.orderItems.map((item) => (
                                <li key={item.product}>
                                <div className="row">
                                    <div>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="small"
                                    ></img>
                                    </div>
                                    <div className="min-30">
                                    <Link to={`/product/${item.product}`}>
                                        {item.name}
                                    </Link>
                                    </div>

                                    <div>
                                    {item.QTY} x ${item.price} = ${item.QTY * item.price}
                                    </div>
                                </div>
                                </li>
                            ))}
                            </ul>
                        </div>
                        </li>
                    </ul>
                    </div>
                    <div className="col-1">
                    <div className="card card-body">
                        <ul>
                        <li>
                            <h2>Order Summary</h2>
                        </li>
                        <li>
                            <div className="row">
                            <div>Items</div>
                            <div>${order.itemsPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                            <div>Shipping</div>
                            <div>${order.shippingPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                            <div>Tax</div>
                            <div>${order.taxPrice.toFixed(2)}</div>
                            </div>
                        </li>
                        <li>
                            <div className="row">
                            <div>
                                <strong> Order Total</strong>
                            </div>
                            <div>
                                <strong>${order.totalPrice.toFixed(2)}</strong>
                            </div>
                            </div>
                        </li>
                        {  !order.isPaid &&(
                            !sdkReady? 
                            (<LoadingBox></LoadingBox>)
                            :
                            (<PayPalButton
                             amount={order.totalPrice}
                             onSuccess={successPaymendHandler}
                            ></PayPalButton>)
                        )                            
                        }
                        </ul>
                    </div>
                    </div>
                </div>
             </div>
            )
    )

        
}
