/* eslint-disable no-unused-vars */
import React from 'react'
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


const PasswordReset = () => {

    const navigator = useNavigate();

    return (
        <div className='z-10 text-white absolute top-0 left-0 w-full h-full bg-[#131313] flex justify-center items-center'>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.3 }}
                    className='w-[400px] h-auto bg-[#0F0F0F] border rounded-2xl p-6 text-white select-none'
                >
                    <div className='flex items-center justify-between mb-7'>
                        <h1 className='text-2xl text-gray-300'>Forgot Password</h1>
                        <button className='cursor-pointer' onClick={() => {
                            navigator('/login')
                        }}>
                            <img src='/close.png' className='w-5 h-5' alt='Close' />
                        </button>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label>Email</label>
                        <input
                            className='border-b focus:outline-none p-2.5'
                            type='email'
                            placeholder='Enter your email'
                            required
                        />
                    </div>
                    <div className='flex justify-center mt-5'>
                        <button
                            className='border rounded-lg px-6 py-2 bg-blue-500 text-white cursor-pointer'
                            type='submit'
                            onClick={() => {
                                
                            }}
                        >
                            Reset Password
                        </button>
                    </div>
                    <div className='flex justify-center mt-3'>
                        <button
                            className='text-blue-500 hover:text-blue-600 cursor-pointer'
                            onClick={() => {
                                navigator('/login');
                            }}
                        >
                            Back to Login
                        </button>
                    </div>
                </motion.div>
            </div>
    )
}

export default PasswordReset
