/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useStore } from '../store/Store';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

    const { isUser, setIsUser, userData, setUserData } = useStore();

    // const [isUser, setIsUser] = useState(true);
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [shopName, setShopName] = useState('');
    const [shopAddress, setShopAddress] = useState('');
    const [businessType, setBusinessType] = useState('');
    const [gstNumber, setGstNumber] = useState('');

    const navigator = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault(); // Prevent form submission from reloading the page
    
        let user = {};

        const role = isUser ? 'USER' : 'SHOPKEEPER';
    
        if (isUser) {
            user = {
                username,
                name: fullName,
                email,
                password,
                phone: phoneNumber,
                dob,
                gender,
                role: role,
                address,
                profileImageUrl: "https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-profile-user-icon.png",
            };
        } else {
            user = {
                username,
                name: fullName,
                email,
                password,
                phone: phoneNumber,
                dob,
                gender,
                address,
                role,
                shopName,
                profileImageUrl: "https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-profile-user-icon.png",
                shopAddress,
                businessType,
                gstNumber,
            };
        }
    
        try {
            const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
            const response = await axios.post(`${VITE_BACKEND_URL}/api/users/register`, user);
            if (response) {
            console.log('User registered successfully:', response.data);
            setUserData({email: email});
            // console.log('User Data:', userData);
            navigator('/otp-verification')
            }
        } catch (error) {
            console.log('Error registering the user:', error);
            console.error('There was an error registering the user:', error);
        }
    };

    return (
        <div className='flex justify-center items-center text-[#F6F8ED] w-full h-screen bg-[#131313] py-10 px-32 max-[950px]:px-16 max-[630px]:px-6'>
            <AnimatePresence mode="wait">
                <motion.div
                    key={isUser ? "user-form" : "shop-form"}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className='w-full h-auto bg-[#0F0F0F] border rounded-xl p-12 text-white select-none'
                >
                    {/* Header and toggle */}
                    <div className='flex items-center justify-between mb-7'>
                        <h1 className='text-2xl text-gray-300'>{isUser ? 'User' : 'ShopKeeper'} Registration</h1>
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
                    <form onSubmit={handleRegister}>
                        <div className='grid grid-cols-3 max-[950px]:grid-cols-2 max-[630px]:grid-cols-1 gap-4'>
                            {/* Personal Information (always rendered) */}
                            <div className='h-full w-full justify-center flex flex-col gap-2'>
                                <label>Username</label>
                                <input
                                    className='border-b focus:outline-none p-2.5'
                                    type='text'
                                    placeholder='Enter your Username'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='h-full w-full justify-center flex flex-col gap-2'>
                                <label>Full Name</label>
                                <input
                                    className='border-b focus:outline-none p-2.5'
                                    type='text'
                                    placeholder='Enter your Full Name'
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='h-full w-full justify-center flex flex-col gap-2'>
                                <label>Email</label>
                                <input
                                    className='border-b focus:outline-none p-2.5'
                                    type='email'
                                    placeholder='Enter your Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='h-full w-full justify-center flex flex-col gap-2'>
                                <label>Password</label>
                                <input
                                    className='border-b focus:outline-none p-2.5'
                                    type='password'
                                    placeholder='Enter your Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='h-full w-full justify-center flex flex-col gap-2'>
                                <label>Phone Number</label>
                                <input
                                    className='border-b focus:outline-none p-2.5'
                                    type='number'
                                    placeholder='Enter your Phone Number'
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='h-full w-full justify-center flex flex-col gap-2'>
                                <label>Date of Birth</label>
                                <input
                                    className='border-b focus:outline-none p-2.5'
                                    type='date'
                                    // placeholder='Enter your Date of Birth'
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='h-full w-full justify-center flex flex-col gap-2'>
                                <label>Gender</label>
                                <select
                                    className='border-b focus:outline-none p-2.5 bg-[#0F0F0F]'
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
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
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
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
                                                value={shopName}
                                                onChange={(e) => setShopName(e.target.value)}
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
                                                value={shopAddress}
                                                onChange={(e) => setShopAddress(e.target.value)}
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
                                                value={businessType}
                                                onChange={(e) => setBusinessType(e.target.value)}
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
                                                value={gstNumber}
                                                onChange={(e) => setGstNumber(e.target.value)}
                                                required
                                            />
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                        <div className='flex justify-center mt-5'>
                            <button
                                className='border rounded-lg px-6 py-2 cursor-pointer'
                                type="submit">
                                Register
                            </button>
                        </div>
                    </form>
                    {/* Toggle to Login */}
                    <div className="flex items-center justify-center mt-5 mb-2">
                        <span>Already have an account?
                            <button
                                className="cursor-pointer text-blue-500 hover:text-blue-600"
                                onClick={() => {
                                    // setIsRegisterCardVisible(false);
                                    // setIsLoginCardVisible(true);
                                    navigator('/login');
                                }}
                            >
                                Login
                            </button>
                        </span>
                    </div>
                </motion.div>
            </AnimatePresence>

        </div>
    )
}

export default Register
