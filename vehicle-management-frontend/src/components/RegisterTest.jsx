/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const RegisterTest = () => {
    const [isUser, setIsUser] = useState(true);
    const navigator = useNavigate();

    return (
        <div className='z-10 text-[#F6F8ED] absolute top-0 left-0 w-full h-full bg-[#131313] flex justify-center items-center md:px-32'>
            <AnimatePresence mode="wait">
                <motion.div
                    key={isUser ? "user-form" : "shop-form"} // change key when isUser toggles
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className='w-full h-auto bg-[#0F0F0F] border rounded-xl p-12 text-white select-none'
                >
                    {/* Header and toggle */}
                    <div className='flex items-center justify-between mb-7'>
                        <h1 className='text-2xl text-gray-300'>User Registration</h1>
                        <button className='cursor-pointer' onClick={() => navigator('/')}>
                            <img src='/close.png' className='w-5 h-5' alt='Close' />
                        </button>
                    </div>
                    <div className="flex w-full items-center justify-center mt-3 mb-5">
                        <div
                            className="w-[50vw] sm:w-[40vw] md:w-[20vw] h-8 bg-white rounded-2xl overflow-hidden flex relative cursor-pointer"
                            onClick={() => setIsUser(!isUser)}
                        >
                            <motion.div
                                className="absolute w-1/2 h-full bg-blue-500 rounded-2xl"
                                initial={false}
                                animate={{ x: isUser ? '0%' : '100%' }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                            <div className="w-1/2 h-full flex items-center justify-center">
                                <p className={`transition-colors duration-200 relative z-10 ${isUser ? 'text-white' : 'text-black'}`}>
                                    User
                                </p>
                            </div>
                            <div className="w-1/2 h-full flex items-center justify-center">
                                <p className={`transition-colors duration-200 relative z-10 ${!isUser ? 'text-white' : 'text-black'}`}>
                                    ShopKeeper
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className='grid grid-cols-3 gap-4'>
                        {/* Personal Information (always rendered) */}
                        <div className='h-full w-full justify-center flex flex-col gap-2'>
                            <label>Username</label>
                            <input
                                className='border-b focus:outline-none p-2.5'
                                type='text'
                                placeholder='Enter your Username'
                                required
                            />
                        </div>
                        <div className='h-full w-full justify-center flex flex-col gap-2'>
                            <label>Full Name</label>
                            <input
                                className='border-b focus:outline-none p-2.5'
                                type='text'
                                placeholder='Enter your Full Name'
                                required
                            />
                        </div>
                        <div className='h-full w-full justify-center flex flex-col gap-2'>
                            <label>Email</label>
                            <input
                                className='border-b focus:outline-none p-2.5'
                                type='email'
                                placeholder='Enter your Email'
                                required
                            />
                        </div>
                        <div className='h-full w-full justify-center flex flex-col gap-2'>
                            <label>Password</label>
                            <input
                                className='border-b focus:outline-none p-2.5'
                                type='password'
                                placeholder='Enter your Password'
                                required
                            />
                        </div>
                        <div className='h-full w-full justify-center flex flex-col gap-2'>
                            <label>Phone Number</label>
                            <input
                                className='border-b focus:outline-none p-2.5'
                                type='number'
                                placeholder='Enter your Phone Number'
                                required
                            />
                        </div>
                        <div className='h-full w-full justify-center flex flex-col gap-2'>
                            <label>Date of Birth</label>
                            <input
                                className='border-b focus:outline-none p-2.5'
                                type='date'
                                required
                            />
                        </div>
                        <div className='h-full w-full justify-center flex flex-col gap-2'>
                            <label>Gender</label>
                            <select
                                className='border-b focus:outline-none p-2.5 bg-[#0F0F0F]'
                                required
                            >
                                <option value="" disabled selected>Select your Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className='h-full w-full justify-center flex flex-col gap-2'>
                            <label>Address</label>
                            <input
                                className='border-b focus:outline-none p-2.5'
                                type='text'
                                placeholder='Enter your Address'
                                required
                            />
                        </div>

                        {/* Business Information (conditionally rendered) */}
                        <AnimatePresence>
                            {!isUser && (
                                <>
                                    <motion.div
                                        key="shopName"
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{ duration: 0.5 }}
                                        className='h-full w-full justify-center flex flex-col gap-2'
                                    >
                                        <label>Shop Name</label>
                                        <input
                                            className='border-b focus:outline-none p-2.5'
                                            type='text'
                                            placeholder='Enter your Shop Name'
                                            required
                                        />
                                    </motion.div>

                                    <motion.div
                                        key="shopAddress"
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{ duration: 0.5 }}
                                        className='h-full w-full justify-center flex flex-col gap-2'
                                    >
                                        <label>Shop Address</label>
                                        <input
                                            className='border-b focus:outline-none p-2.5'
                                            type='text'
                                            placeholder='Enter your Shop Address'
                                            required
                                        />
                                    </motion.div>
                                    <motion.div
                                        key="businessType"
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{ duration: 0.5 }}
                                        className='h-full w-full justify-center flex flex-col gap-2'
                                    >
                                        <label>Business Type</label>
                                        <input
                                            className='border-b focus:outline-none p-2.5'
                                            type='text'
                                            placeholder='Enter your Business Type'
                                            required
                                        />
                                    </motion.div>
                                    <motion.div
                                        key="gstNumber"
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{ duration: 0.5 }}
                                        className='h-full w-full justify-center flex flex-col gap-2'
                                    >
                                        <label>GST Number</label>
                                        <input
                                            className='border-b focus:outline-none p-2.5'
                                            type='text'
                                            placeholder='Enter your GST Number'
                                            required
                                        />
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </AnimatePresence>

        </div>
    );
};

export default RegisterTest;
