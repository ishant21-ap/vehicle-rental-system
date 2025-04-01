// import React from 'react'
import Quality from '../assets/stars-01.png'
import AffordablePrice from '../assets/CoinsHand.png'
import Tick from '../assets/check-verified-01.png'

const Services = () => {
    return (
        <div className="text-[#F6F8ED] bg-black flex flex-col items-center justify-center py-10 text-center">
            <div className='mb-10 w-1/2 p-10'>
                <div className='text-5xl font-bold mb-8'>
                    Our Services & Benefits
                </div>
                <div className='text-lg font-semibold'>
                    To make renting easy and hassle-free, we provide a variety of services and advantages. We have you covered with a variety of vehicles and flexible rental terms.
                </div>
            </div>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                <div className='flex flex-col items-center justify-center px-10'>
                    <div className='bg-[#F6F8ED] p-5 rounded-full mb-3'>
                        <img src={Quality} alt="" />
                    </div>
                    <div className='font-semibold text-2xl my-2'>
                        Quality Choice
                    </div>
                    <div className='text-lg'>
                        We offer a wide range of high-quality vehicles to choose from, including luxury cars, SUVs, vans, and more.
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center px-10'>
                    <div className='bg-[#F6F8ED] p-5 rounded-full mb-3'>
                        <img src={AffordablePrice} alt="" />
                    </div>
                    <div className='text-2xl font-semibold my-2'>
                        Affordable Prices
                    </div>
                    <div className='text-lg'>
                        Our rental rates are highly competitive and affordable, allowing our customers to enjoy their trips without breaking the bank.
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center px-10'>
                    <div className='bg-[#F6F8ED] p-5 rounded-full mb-3'>
                        <img src={Tick} alt="" />
                    </div>
                    <div className='text-2xl font-semibold my-2'>
                        Convenient Online Booking
                    </div>
                    <div className='text-lg'>
                        With our easy-to-use online booking system, customers can quickly and conveniently reserve their rental car from anywhere, anytime.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services
