/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleGauge } from 'lucide-react';
import Gear from "../assets/manual-gearbox.png";
import User from "../assets/users.png";
import Gas from "../assets/gas-station.png";
import { useStore } from '../store/Store';

const CarCard = ({ car }) => {
    const { isDarkMode } = useStore();
    const navigate = useNavigate();

    const handleRentNow = () => {
        // Navigate to the car description page and pass the car data via state
        navigate('/car-description', { state: { carData: car } });
    };

    return (
        <div
            className={`${!isDarkMode ? "bg-gray-800 text-white" : "bg-[#f3f2ef] text-black"} flex flex-col gap-y-5 w-full h-auto items-center px-12 py-5 shadow-lg rounded-lg transition-all duration-300`}
        >
            <div className="w-full h-60 rounded-xl overflow-hidden">
                <img
                    src={car.imageUrls && car.imageUrls.length > 0 ? car.imageUrls[0] : ''}
                    alt={car.name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="w-full text-2xl px-1 font-semibold">
                {car.name}
            </div>
            <div className="flex items-center justify-start w-full px-1">
                <div className="text-4xl font-bold">Rs.{car.price}</div>
                <div className="h-full text-lg flex pt-2">/day</div>
            </div>
            <div
                className={`${!isDarkMode ? "bg-gray-700" : "bg-[#e8eaee]"} flex items-center justify-between w-full px-5 rounded-xl py-2 transition-all duration-300`}
            >
                <div className="flex flex-col items-center gap-y-2">
                    <CircleGauge size={24} />
                    <h1>4000</h1>
                </div>
                <div className="flex flex-col items-center gap-y-2">
                    <img src={Gear} alt="Gearbox" />
                    <h1>Auto</h1>
                </div>
                <div className="flex flex-col items-center gap-y-2">
                    <img src={User} alt="Capacity" />
                    <h1>4 Person</h1>
                </div>
                <div className="flex flex-col items-center gap-y-2">
                    <img src={Gas} alt="Fuel Type" />
                    <h1>Petrol</h1>
                </div>
            </div>
            <div className="w-full text-center text-md font-semibold">
                <button
                    onClick={handleRentNow}
                    className={`${!isDarkMode
                        ? "bg-gray-800 text-white border border-white hover:bg-white hover:text-gray-800"
                        : "bg-[#f3f2ef] text-black border-2 border-black hover:bg-black hover:text-white"
                        } w-full py-2 mt-2 rounded-xl cursor-pointer transition-all duration-300`}
                >
                    Rent Now
                </button>
            </div>
        </div>
    );
}

export default CarCard;
