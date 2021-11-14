import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { paymentMethodAction } from '../actions/cartActions';
import CheckOutSteps from '../components/CheckOutSteps'

export default function PaymentScreen(props) {

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;
        if (!shippingAddress.address) 
         props.history.push('/shipping');
        

    const [paymentMethod, setPaymentMethod] = useState('paypal');
    const dispatch = useDispatch();

    const onSubmitHandler= (event)=>{
        event.preventDefault();
        dispatch(paymentMethodAction(paymentMethod))
        props.history.push('/placeorder')
    }
    return (
        <div>
            <CheckOutSteps step1 step2 step3></CheckOutSteps>

            <form className='form' onSubmit={onSubmitHandler}>
                <div>
                    <h2>Payment Method</h2>
                </div>
                <div className='radio'>
                    <input 
                        type='radio' 
                        required
                        checked 
                        id='paypal' 
                        value='paypal'
                        name='paymentMethod'
                        onChange={(event)=> setPaymentMethod(event.target.value)}
                        />
                    <label htmlFor='paypal'>PayPal</label>
                </div>
                <div className='radio'>
                    <input 
                        type='radio'  
                        id='stripe' 
                        required
                        value='stripe' 
                        name='paymentMethod'
                        onChange={(event)=> setPaymentMethod(event.target.value)}
                        />
                    <label htmlFor='stripe'>Stripe</label>
                </div>
                <div>
                    <label htmlFor=''></label>
                    <button className="primary btn-block" type="submit">Continue</button>       
                </div>
            </form>
    </div>

           )
}

