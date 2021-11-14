import React from 'react'

import {BrowserRouter, Link, Route} from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import Counter from './components/Counter';
import { useSelector, useDispatch} from 'react-redux';
import signinScreen from './screens/signinScreen.js';
import { signOutAction } from './actions/UserActions.js';
import registerScreen from './screens/registerScreen.js';
import ShippingScreen from './screens/ShippingScreen.js';
import PaymentScreen from './screens/PaymentScreen.js';
import placeorderScreen from './screens/placeorderScreen.js';
import OrderScreen from './screens/OrderScreen.js';
import OrderHistoryScreen from './screens/OrderHistoryScreen';



function App(props) {
     const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;
  
  const userSignin= useSelector(state =>state.userSignin);
    const {userInfo} =userSignin
    // console.log(userInfo);
  //  console.log('app js');  
  // console.log(userInfo);


  const signOutOnClickHandler=()=>{

    dispatch(signOutAction());
    // props.histroy.push('/signout');
    // props.history.push('/');


  }
  
  return (
    //  i used BrowserRouter her to avoid this error 'you-should-not-use-link-outside-a-router'
    <BrowserRouter>
        <div className="grid-container">
            <header className="row">
              <div>
                <a className="brand" href="/">
                BookStore
                </a>
              </div>
              <div>
                <a href="/cart">Cart{
                  cartItems.length > 0 &&(
                    <span className="badge">{cartItems.length}</span>
                  )
                }</a>
                {/* <Link to="/signin">Sign In</Link> */}
               { userInfo?  
                (
                  <div className='dropp__down'>
                  <Link to='#none'> {userInfo.name}</Link>
                    <ul className='dropp__down_content'>
                      <li>
                       <a href='/signin' onClick={signOutOnClickHandler}> Sign out</a>
                      </li>
                      <li>
                      <a href='/orderhistory' > Order History</a>
                      </li>
                    </ul>
                   </div>)
                :
                (<a href='/signin'> Sign In</a>)
               }
              </div>
            </header>

            <main>
              <BrowserRouter>

                <Route path='/cart/:id?' component={CartScreen}></Route>
                <Route path='/counter' component={Counter}></Route>
                <Route path='/product/:id' component={ProductScreen}></Route>
                <Route path="/signin" component={signinScreen}></Route>
                <Route path='/register' component={registerScreen}></Route>
                <Route path='/shipping' component={ShippingScreen}></Route>
                <Route path='/payment' component={PaymentScreen}></Route>
                <Route path='/placeorder' component={placeorderScreen}></Route>
                <Route path='/order/:id' component={OrderScreen}></Route>
                <Route path='/orderhistory' component={OrderHistoryScreen}></Route>
                <Route path='/' component={HomeScreen} exact></Route>

              </BrowserRouter>
            </main>

            <footer className="row center">All right reserved</footer>
          </div>
    </BrowserRouter>
  );
}


export default App;
 