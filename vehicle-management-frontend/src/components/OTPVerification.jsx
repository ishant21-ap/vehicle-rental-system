/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useStore } from '../store/Store';
import { useNavigate } from 'react-router-dom';

const OTPVerification = () => {

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);
    const { userData } = useStore();

    const navigator = useNavigate();

        useEffect(() => {
            inputRefs.current = inputRefs.current.slice(0, 6);
        }, []);

    const handleChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value !== '' && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');

        if (!/^\d*$/.test(pastedData.join(''))) return;

        const newOtp = [...otp];
        pastedData.forEach((value, index) => {
            if (index < 6) {
                newOtp[index] = value;
            }
        });
        setOtp(newOtp);

        const lastFilledIndex = newOtp.findLastIndex(val => val !== '');
        const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
        inputRefs.current[focusIndex].focus();
    };

    // setIsOTPCardVisible(false)

    const handleClick = async () => {
        console.log(otp.join(''));

        const otpString = otp.join('');

        const email = userData.email;

        try {
            const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
            const response = await axios.post(`${VITE_BACKEND_URL}/api/users/verifyOtp?email=${email}&otp=${otpString}`);
            console.log(response.data);
            console.log('OTP verified successfully');
            if (response.status === 200) {
                navigator('/login')
            } else {
                console.log("Invalid OTP");
                
            }
        } catch (error) {
            console.log('Error:', error);
            console.log('Failed to verify OTP');
        }
    };


    return (
        <>
            <AnimatePresence>
                <motion.div
                    key="otp-modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className='z-10 text-white absolute top-0 left-0 w-full h-full bg-[#131313] flex justify-center items-center'
                // onClick={() => setIsOTPCardVisible(false)} // Close modal when clicking outside
                >
                    <motion.div
                        key="otp-card"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.3 }}
                        className='w-[400px] h-auto bg-[#0F0F0F] border rounded-xl p-10 text-white select-none'
                        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the card from closing the modal
                    >
                        <h2 className='text-2xl font-semibold text-center mb-6'>Enter Verification Code</h2>
                        <p className='text-gray-400 text-center mb-8'>
                            We&#39;ve sent a verification code to your email
                        </p>
                        <div className='flex justify-between gap-2 mb-8'>
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={el => inputRefs.current[index] = el}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    className='w-12 h-12 border border-gray-600 rounded-lg bg-transparent text-center text-xl focus:border-blue-500 focus:outline-none transition-colors'
                                    autoFocus={index === 0}
                                />
                            ))}
                        </div>
                        <div className='text-center'>
                            <button
                                className='px-8 py-2 bg-blue-500 rounded-lg font-medium hover:bg-blue-600 transition-colors'
                                onClick={handleClick}
                            >
                                Verify
                            </button>
                            <p className='mt-4 text-gray-400'>
                                Didn&#39;t receive code? <button className='text-blue-500 hover:text-blue-400'>Resend</button>
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </>
    );
};

export default OTPVerification;