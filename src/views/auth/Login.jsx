import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import { customer_login, messageClear } from '../../store/reducers/authReducer';
import toast from 'react-hot-toast';

const LoginPage = () => {

  const navigate = useNavigate()
    const {loader,errorMessage,successMessage,userInfo } = useSelector(state => state.auth)
    const dispatch = useDispatch()
  const [state, setState] = useState({ 
    email: '',
    password: ''
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (e) => {
    e.preventDefault()
        dispatch(customer_login(state))
  };

  const overrideStyle = {
    display : 'flex',
    margin : '0 auto',
    height: '24px',
    justifyContent : 'center',
    alignItems : 'center'
}

  useEffect(() => { 
    if (successMessage) {
        toast.success(successMessage)
        dispatch(messageClear())  
        navigate('/home')
    } 
    if (errorMessage) {
        toast.error(errorMessage)
        dispatch(messageClear())  
    } 
    if (userInfo) {
        navigate('/home')
    }
},[successMessage,errorMessage])

  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={state.email}
              onChange={inputHandle}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={state.password}
              onChange={inputHandle}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loader ? true : false}
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
             {
               loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle} /> : 'Login'
            } 
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500">   
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
