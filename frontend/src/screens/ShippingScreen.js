import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ShippingAction } from '../actions/cartActions';
import CheckOutSteps from '../components/CheckOutSteps';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessagBox'

export default function ShippingScreen(props) {


    const userSignin = useSelector(state => state.userSignin)
    const {userInfo} = userSignin
      if(!userInfo){
         props.history.push('/signin')
      }

      const cart = useSelector(state => state.cart);
      const { shippingAddress} = cart;

   const [fullName, setFullName] = useState(shippingAddress.fullName);
   const [address, setAddress] = useState(shippingAddress.address);
   const [city, setCity] = useState(shippingAddress.city);
   const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
   const [country, setCountry] = useState(shippingAddress.country);
   const dispatch = useDispatch();

    
    const onSubmmitFormHandler= (event)=>{
        event.preventDefault();
       dispatch(ShippingAction({fullName, address, city, postalCode, country}));
       props.history.push('payment');
    }
    return (
        <div>
         <CheckOutSteps step1 step2></CheckOutSteps>         
         <div>
                <form className='form' onSubmit={onSubmmitFormHandler}> 
                    <h2>Shipping Adress</h2>
                    <div>
                    {/* {error && (<MessageBox variant="danger">{error}</MessageBox>)} */}
                    {/* {loading && ( <LoadingBox></LoadingBox>)} */}
                    </div>
                    <div>
                        <label htmlFor="full__name">Full name</label>
                        <input
                        type='text'
                        id='full__name'
                        value={fullName}
                        placeholder='Enter your Full name'
                        required
                        onChange={e=>setFullName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="adress">Adress</label>
                        <input
                        type='text'
                        id='adress'
                        value={address}
                        placeholder='Enter your Full address'
                        required
                        onChange={e=>setAddress(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="city">City</label>
                        <input
                        type='text'
                        id='city'
                        value={city}
                        placeholder='Enter your City'
                        required
                        onChange={e=>setCity(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="postal__code">Postal Code</label>
                        <input
                        type='text'
                        id='postal__code'
                        value={postalCode}
                        placeholder='Enter your Postal Code'
                        required
                        onChange={e=>setPostalCode(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="country">Country</label>
                        <input
                        type='text'
                        id='country'
                        value={country}
                        placeholder='Enter your Country'
                        required
                        onChange={e=>setCountry(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor=''></label>
                        <button className="primary btn-block" type="submit">Continue</button>
                    </div>
                    
                </form>            
          </div>   
        </div>
    )
}
