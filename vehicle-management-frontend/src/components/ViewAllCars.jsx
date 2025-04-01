// import React from 'react'
import { carData } from '../constants'
import CarCard from './CarCard'
import { useState, useEffect } from 'react';
import axios from 'axios';

const ViewAllCars = () => {

    const [allCars, setAllCars] = useState([]);

    useEffect(() => {
        const fetchAllCars = async () => {
            try {
                const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
                const response = await axios.get(`${VITE_BACKEND_URL}/api/vehicles`);

                if (response.status === 200) {
                    setAllCars(response.data);
                    console.log(response.data);
                    
                } else {
                    console.error("Error fetching data: Unexpected response status", response.status);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchAllCars();
    }, []);
    
    return (
        <div className='bg-[#F6F8ED] text-black flex flex-col gap-y-5 w-full h-auto items-center px-10 py-10'>
            <div className='text-5xl font-bold'>
                Our Impressive Collection of Vehicles
            </div>
            <div className='w-1/2 text-center text-md font-semibold mb-6'>
                Explore our wide range of cars that cater to all your needs. Whether you&apos;re looking for a compact car for city driving or a spacious SUV for family trips, we have it all. Our vehicles are equipped with the latest technology and safety features to ensure a comfortable and secure ride. Visit us today and find the perfect car for you!
            </div>
            <div className="grid grid-cols-3 gap-10 w-full h-auto">
                {allCars.map((car, index) => (
                    <CarCard key={index} car={car} />
                ))}
            </div>
        </div>
    )
}

export default ViewAllCars
