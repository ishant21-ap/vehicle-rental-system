/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useStore } from '../store/Store';

const Navbar = () => {
  const { isDarkMode, setIsDarkMode, userData } = useStore();
  const navigator = useNavigate();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const registerHandler = () => {
    navigator('/register');
  };

  const token = localStorage.getItem('jwtToken');

  React.useEffect(() => {
    console.log(token);
    console.log(userData);
    
  }, [token])

  return (
    <div className={`w-full h-[100px] ${isDarkMode ? 'bg-[#000000]' : 'bg-[#F6F8ED]'} flex justify-between items-center px-2 sm:px-6 text-white lg:px-28 select-none transition-all duration-300`}>
      <div>
        <img src='/Heading.png' className={`w-auto h-auto ${isDarkMode ? 'invert-0' : 'invert-100'}`}  alt="Heading" />
      </div>

      <div className='flex gap-4'>
        {/* Dark Mode Toggle Button */}
        <motion.div
          className='relative w-16 h-8 bg-[#181819] flex items-center p-1 rounded-full cursor-pointer'
          initial={{ backgroundColor: '#181819' }}
          animate={{ backgroundColor: isDarkMode ? '#181819' : '#F6F8ED' }}
          transition={{ duration: 0.3 }}
          onClick={toggleDarkMode}
        >
          <motion.div
            className='absolute w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md'
            initial={{ x: isDarkMode ? 0 : 28 }}
            animate={{ x: isDarkMode ? 0 : 28 }}
            transition={{ duration: 0.3 }}
          >
            {isDarkMode ? <Moon className='size-4 text-blue-400' /> : <Sun className='size-4 text-amber-300' />}
          </motion.div>
        </motion.div>

        {/* Conditionally render Register/ Profile Button */}
        {token ? (
          <NavLink to="/profile" className=''>
            Profile
          </NavLink>
        ) : (
          <motion.button
            animate={{
              backgroundColor: isDarkMode ? '#181819' : '#fdf5e6',
              color: isDarkMode ? '#F6F8ED' : '#1E1E1E',
            }}
            whileHover={{
              scale: 1.03,
              backgroundColor: isDarkMode ? '#F6F8ED' : '#fadfad',
              color: isDarkMode ? '#1E1E1E' : '#fa8072',
            }}
            transition={{ duration: 0.3 }}
            onClick={registerHandler}
            className='text-lg tracking-wide px-5 py-1 rounded-3xl cursor-pointer'
          >
            Register
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
