import { Instagram, Twitter, Youtube, Facebook } from 'lucide-react';

// import React from 'react'

const Footer = () => {
    return (
        <div className="bg-black w-full py-10 px-24 text-[#F6F8ED] flex flex-row items-center justify-between">
            <div className="">
                <img src='/Heading.png' className='w-auto h-auto' alt="Heading" />
            </div>
            <div className='flex gap-x-5'>
                <div className='cursor-pointer'>Rent</div>
                <div className='cursor-pointer'>About Us</div>
                <div className='cursor-pointer'>Contact Us</div>
            </div>
            <div>
                <div className="flex space-x-4">
                    <Instagram className="w-6 h-6 cursor-pointer" />
                    <Twitter className="w-6 h-6 cursor-pointer" />
                    <Youtube className="w-6 h-6 cursor-pointer" />
                    <Facebook className="w-6 h-6 cursor-pointer" />
                </div>
            </div>
        </div>
    )
}

export default Footer
