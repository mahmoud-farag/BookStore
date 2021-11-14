import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { signinAction } from '../actions/UserActions';
import MessageBox from '../components/MessagBox';
import LoadingBox from '../components/LoadingBox';

export default function SigninScreen(props) {

        const [email, setEmail] = useState(''); 
        const [password, setPassword] = useState('');
        const dispatch = useDispatch();


        const userSignin = useSelector(state => state.userSignin)
         const {userInfo, loading, error} = userSignin;
        
        console.log(loading);
        const redirect  = props.location.search ?  props.location.search.split('=')[1] : '/' ;
        const onSubmmitFormHandler= (e)=>{
        e.preventDefault();

        dispatch(signinAction(email, password));
        setEmail('');
        setPassword('');
    }

    useEffect(() => {
        
        if(userInfo){

            props.history.push(redirect);
        }
    }, [userInfo,props.history, redirect])

    return (
        <div>
            <div>
                {}
            </div>
            <form className='form' onSubmit={onSubmmitFormHandler}> 
                <h2>Sign in</h2>
                <div>
                     {error && (<MessageBox variant="danger">{error}</MessageBox>)}
                    {loading && ( <LoadingBox></LoadingBox>)}
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                     type='email'
                     id='email'
                     value={email}
                      placeholder='Enter your email'
                      required
                      onChange={e=>setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                    type='pasword'
                    id='password'
                    value={password}
                    placeholder="Enter your password"
                    required
                    onChange={e=>setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor=''></label>
                    <button className="primary btn-block" type="submit">Sign in</button>
                </div>
                <div>
                    <label htmlFor=''></label>
                    New customer? {' '}<Link to={`/register?redirect=${redirect}`}>Create your account</Link>
                </div>
            </form>            
        </div>
    )
}



