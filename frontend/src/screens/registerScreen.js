import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerAction } from '../actions/UserActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessagBox';

const RegisterScreen =(props)=> {
        
    const [name, setName] = useState('');
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [confirmePassword, setConfirmePassword] = useState('');
    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);
    const {registerInfo, loading, error} = userRegister;

    const redirect  = props.location.search ?  props.location.search.split('=')[1] : '/' ;

    const onSubmmitFormHandler = (event)=>{
        event.preventDefault();
       if(password !== confirmePassword){
           alert('confirm password does not with password ');
       }else{
        dispatch(registerAction(name, email, password))
         setName('');
         setPassword('');
         setEmail('');
         setConfirmePassword('');
       }
    }
    useEffect(() => {
        if(registerInfo){

            props.history.push(redirect);
        }
    }, [redirect, registerInfo, props.history]);
    return (
        <div>
           
            <form className='form' onSubmit={onSubmmitFormHandler}> 
                <h2>Create New Account</h2>
                <div>
                  {error && (<MessageBox variant="danger">{error}</MessageBox>)}
                  {loading && ( <LoadingBox></LoadingBox>)}
                </div>
                <div>
                    <label htmlFor="name">name</label>
                    <input
                     type='text'
                     id='name'
                     value={name}
                      placeholder='Enter your name'
                      required
                      onChange={e=>setName(e.target.value)}
                    />
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
                    <label htmlFor="password">Confirem Password</label>
                    <input 
                    type='pasword'
                    id='password'
                    value={confirmePassword}
                    placeholder="Confirem Password"
                    required
                    onChange={e=>setConfirmePassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor=''></label>
                    <button className="primary btn-block" type="submit">Create Account</button>
                </div>
                <div>
                    <label htmlFor=''></label>
                    Already have an account? {' '}<Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
                </div>
            </form>            
        </div>
    )

}
export default RegisterScreen
