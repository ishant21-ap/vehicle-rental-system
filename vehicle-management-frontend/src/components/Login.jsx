/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useStore } from '../store/Store';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setUserData } = useStore()

    const navigator = useNavigate();

    const handleClick = async (event) => {
        // event.preventDefault();

        const user = {
            email,
            password
        }

        try {
            const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
            const response = await axios.post(`${VITE_BACKEND_URL}/api/users/login`, user);
            // console.log(response.data.jwtToken);
            
            localStorage.setItem('jwtToken', response.data.jwtToken);
            localStorage.setItem('email', response.data.username)

            const fetchedMail = response.data.username;
            // console.log(response.data);

            const fetchUserData = await axios.get(`${VITE_BACKEND_URL}/api/users/${fetchedMail}`)

            setUserData(fetchUserData.data);
            
            // console.log('Logged in successfully');

            // console.log(fetchUserData)
        
            const userRole = fetchUserData.data.role.toUpperCase()

            if (userRole === "SHOPKEEPER") {
                navigator('/shopkeeper');
            } else {
                navigator('/');
            }
        } catch (error) {
            console.log('Error:', error);
            console.log('Failed to login');
        }
    }

    return (
        <div className='z-10 text-white absolute top-0 left-0 w-full h-full bg-[#131313] flex justify-center items-center'>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.3 }}
                        className='w-[400px] h-auto bg-[#0F0F0F] border rounded-xl p-10 text-white select-none'
                    >

                        <div className='w-full h-full flex flex-col'>
                            <div className='flex items-center justify-between mb-7'>
                                <h1 className='text-2xl text-gray-300'>User Login</h1>
                                <button className='cursor-pointer' onClick={() => {
                                    navigator('/')
                                }}>
                                    <img src='/close.png' className='w-5 h-5' alt='Close' />
                                </button>
                            </div>
                            <div className='flex flex-col gap-3'>
                                <label>Username</label>
                                <input
                                    className='border-b focus:outline-none p-2.5'
                                    type='text'
                                    placeholder='Enter your Username'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='flex flex-col gap-3 mt-5'>
                                <label>Password</label>
                                <input
                                    className='border-b focus:outline-none p-2.5'
                                    type='password'
                                    placeholder='Enter your Password'
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className='flex justify-between items-center mt-4'>
                                <div className='flex items-center gap-1'>
                                    <input type='checkbox' className='accent-blue-500' />
                                    <label>Remember Me</label>
                                </div>
                                <button
                                    className='text-blue-500 hover:text-blue-600 cursor-pointer'
                                onClick={() => {
                                    // setIsForgotPasswordActive(true)
                                    // setIsLoginCardVisible(false)
                                    navigator('/forgot-password');
                                }}
                                >
                                    Forgot Password?
                                </button>
                            </div>
                            <div className='flex justify-center mt-5'>
                                <button
                                    className='border rounded-lg px-6 py-2' type='submit'
                                onClick={() => {
                                    // setIsOTPCardVisible(true)
                                    // setIsLoginCardVisible(false)
                                    // navigator('/otp-verification');
                                    handleClick();
                                }}
                                >
                                    Login
                                </button>
                            </div>
                            <div className='flex items-center justify-center mt-5 mb-2'>
                                <span>Don&lsquo;t have an account?
                                    <button
                                        className='cursor-pointer text-blue-500 hover:text-blue-600'
                                        onClick={() => {
                                            // setIsLoginCardVisible(false)
                                            // setIsRegisterCardVisible(true)
                                            navigator('/register');
                                        }}
                                    >
                                        Create one
                                    </button>
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
    )
}

export default Login
