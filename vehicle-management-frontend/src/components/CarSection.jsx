import React, { useEffect, useState } from 'react';
import { ArrowRight } from "lucide-react";
import CarCard from "./CarCard";
import { Link } from "react-router-dom";
import { useStore } from '../store/Store';
import axios from 'axios';

const CarSection = () => {
    const { isDarkMode } = useStore();
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
        <div
            className={`${!isDarkMode ? "bg-gray-900 text-white" : "bg-[#F6F8ED] text-black"} flex flex-col gap-y-5 w-full h-auto items-center px-10 py-20 transition-all duration-300`}
        >
            <div className="text-5xl font-bold">
                Our Impressive Collection of Vehicles
            </div>
            <div className="w-1/2 text-center text-md font-semibold mb-2">
                Explore our wide range of cars that cater to all your needs. Whether you&apos;re looking for a compact car for city driving or a spacious SUV for family trips, we have it all. Our vehicles are equipped with the latest technology and safety features to ensure a comfortable and secure ride. Visit us today and find the perfect car for you!
            </div>
            <div className="grid grid-cols-3 gap-10 w-full h-auto">
                {allCars.length > 0 ? (
                    allCars.map((car, index) => (
                        <CarCard key={car.id || index} car={car} />
                    ))
                ) : (
                    <p className="col-span-3 text-center text-lg">No cars available at the moment.</p>
                )}
            </div>
            <div className="text-center text-md font-semibold">
                <Link
                    to={'/all-vehicles'}
                    className={`flex items-center justify-center cursor-pointer ${!isDarkMode
                        ? "bg-gray-800 text-white border-2 border-white hover:bg-white hover:text-gray-800"
                        : "bg-[#F6F8ED] text-black border-2 border-black hover:bg-black hover:text-white"
                        } w-full py-2 mt-5 px-10 rounded-xl transition-all duration-300`}
                >
                    View All Cars
                    <ArrowRight size={24} className="inline-block ml-2" />
                </Link>
            </div>
        </div>
    );
};

export default CarSection;
