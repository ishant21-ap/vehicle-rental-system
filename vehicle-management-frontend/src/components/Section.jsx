import { MapPin, MoveRight } from 'lucide-react';

import Toyota from '../assets/Toyota.png';
import Ford from '../assets/layer1.png';
import Tesla from '../assets/Tesla.png';
import Volkswagen from '../assets/Volkswagen.png';
import Honda from '../assets/Honda.png';
import Nissan from '../assets/Nissan.png';
import Chevrolet from '../assets/Chevrolet.png';
import Kia from '../assets/Kia.png';
import Hyundai from '../assets/Hyundai.png';
import Audi from '../assets/Audi.png';
import BMW from '../assets/bmw.png';
import Mercedes from '../assets/Mercedes.png';

import SUV from '../assets/suv.png';
import CrossOver from '../assets/crossover.png';
import Wagon from '../assets/wagon.png';
import MPV from '../assets/mpv.png';
import Coupe from '../assets/coupe.png';
import Compact from '../assets/compact.png';
import Coup from '../assets/coup.png';
import PickUp from '../assets/pickup.png';
import Sedan from '../assets/sedan.png';
import Limousine from '../assets/limousine.png';
import Convertible from '../assets/convertible.png';
import Van from '../assets/crossover1.png';
import { useStore } from '../store/Store';


const Section = () => {

      const { isDarkMode, setIsDarkMode, userData } = useStore();
    
    return (
        <div className={`relative w-full h-full max-[1200px]:h-auto ${isDarkMode ? 'bg-[#F6F8ED]' : 'bg-black'} flex flex-col items-center justify-center`}>
            {/* Top Search Container */}
            <div className='absolute -top-10 bg-[#FCFCFD]/97 w-auto flex flex-wrap lg:flex-nowrap justify-between items-center p-4 rounded-lg px-4 md:px-8 lg:px-10 gap-2'>
                <div className='flex flex-col gap-y-1 flex-1'>
                    <span className='text-lg font-semibold'>Pick-up Location</span>
                    <div className='flex p-2 rounded-2xl gap-x-3 bg-white border border-gray-200'>
                        <MapPin className='text-black' />
                        <input
                            type="text"
                            className='w-28 sm:w-32 md:w-36 lg:w-40 focus:outline-none'
                            placeholder='Search a location'
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-y-1 flex-1'>
                    <span className='text-lg font-semibold'>Pick-up Date</span>
                    <div className='flex p-2 rounded-2xl gap-x-3 bg-white border border-gray-200'>
                        <input
                            type="date"
                            className='w-28 sm:w-32 md:w-36 lg:w-40 focus:outline-none pl-1.5'
                            placeholder='Select a date'
                        />
                    </div>
                </div>
                {/* <div className='flex flex-col gap-y-1 flex-1'>
                    <span className='text-lg font-semibold'>Drop-off Location</span>
                    <div className='flex p-2 rounded-2xl gap-x-3 bg-white border border-gray-200'>
                        <MapPin className='text-black' />
                        <input
                            type="text"
                            className='w-28 sm:w-32 md:w-36 lg:w-40 focus:outline-none'
                            placeholder='Search a location'
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-y-1 flex-1'>
                    <span className='text-lg font-semibold'>Drop-off Date</span>
                    <div className='flex p-2 rounded-2xl gap-x-3 bg-white border border-gray-200'>
                        <input
                            type="date"
                            className='w-28 sm:w-32 md:w-36 lg:w-40 focus:outline-none pl-1.5'
                            placeholder='Select a date'
                        />
                    </div>
                </div> */}
                <div className='flex px-4 p-2 ml-4 cursor-pointer bg-black rounded-2xl text-white text-nowrap justify-center items-center gap-x-2'>
                    <button className='cursor-pointer'>
                        Find a Vehicle
                    </button>
                    <MoveRight className='cursor-pointer' />
                </div>
            </div>

            {/* First Section: Rent by Brands */}
            <div className='flex flex-col w-full mt-10 max-[1200px]:mt-20 max-[1120px]:mt-28 max-[970px]:mt-36 max-[550px]:mt-44 max-[360px]:mt-88'>
                <div className='flex justify-between items-center py-4 px-4 sm:px-10'>
                    <span className='text-2xl font-semibold pl-5'>
                        Rent by Brands
                    </span>
                    <span className='flex flex-row gap-x-1 text-lg items-center justify-center cursor-pointer'>
                        View all
                        <MoveRight />
                    </span>
                </div>
                <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4 sm:px-10'>
                    <div className='flex flex-col items-center justify-center bg-gray-200 rounded-xl py-4 gap-y-2'>
                        <img src={Toyota} alt="Toyota" className="max-h-12" />
                        <span className='text-xl font-semibold'>Toyota</span>
                    </div>
                    <div className='flex flex-col items-center justify-center bg-gray-200 rounded-xl py-4 gap-y-2'>
                        <img src={Ford} alt="Ford" className="max-h-12" />
                        <span className='text-xl font-semibold'>Ford</span>
                    </div>
                    <div className='flex flex-col items-center justify-center bg-gray-200 rounded-xl py-4 gap-y-2'>
                        <img src={Tesla} alt="Tesla" className="max-h-12" />
                        <span className='text-xl font-semibold'>Tesla</span>
                    </div>
                    <div className='flex flex-col items-center justify-center bg-gray-200 rounded-xl py-4 gap-y-2'>
                        <img src={Volkswagen} alt="Volkswagen" className="max-h-12" />
                        <span className='text-xl font-semibold'>Volkswagen</span>
                    </div>
                    <div className='flex flex-col items-center justify-center bg-gray-200 rounded-xl py-4 gap-y-2'>
                        <img src={Honda} alt="Honda" className="max-h-12" />
                        <span className='text-xl font-semibold'>Honda</span>
                    </div>
                    <div className='flex flex-col items-center justify-center bg-gray-200 rounded-xl py-4 gap-y-2'>
                        <img src={Nissan} alt="Nissan" className="max-h-12" />
                        <span className='text-xl font-semibold'>Nissan</span>
                    </div>
                    <div className='flex flex-col items-center justify-center bg-gray-200 rounded-xl py-4 gap-y-2'>
                        <img src={Chevrolet} alt="Chevrolet" className="max-h-12" />
                        <span className='text-xl font-semibold'>Chevrolet</span>
                    </div>
                    <div className='flex flex-col items-center justify-center bg-gray-200 rounded-xl py-4 gap-y-2'>
                        <img src={Kia} alt="Kia" className="max-h-12" />
                        <span className='text-xl font-semibold'>Kia</span>
                    </div>
                    <div className='flex flex-col items-center justify-center bg-gray-200 rounded-xl py-4 gap-y-2'>
                        <img src={Hyundai} alt="Hyundai" className="max-h-12" />
                        <span className='text-xl font-semibold'>Hyundai</span>
                    </div>
                    <div className='flex flex-col items-center justify-center bg-gray-200 rounded-xl py-4 gap-y-2'>
                        <img src={Audi} alt="Audi" className="max-h-12" />
                        <span className='text-xl font-semibold'>Audi</span>
                    </div>
                    <div className='flex flex-col items-center justify-center bg-gray-200 rounded-xl py-4 gap-y-2'>
                        <img src={BMW} alt="BMW" className="max-h-12" />
                        <span className='text-xl font-semibold'>BMW</span>
                    </div>
                    <div className='flex flex-col items-center justify-center bg-gray-200 rounded-xl py-4 gap-y-2'>
                        <img src={Mercedes} alt="Mercedes" className="max-h-12" />
                        <span className='text-xl font-semibold'>Mercedes</span>
                    </div>
                </div>
            </div>

            {/* Second Section: Rent by Categories */}
            <div className='flex flex-col w-full mb-10'>
                <div className='flex justify-between items-center py-4 px-4 sm:px-10 mt-4'>
                    <span className='text-2xl font-semibold pl-5'>
                        Rent by Categories
                    </span>
                    <span className='flex flex-row gap-x-1 text-lg items-center justify-center cursor-pointer'>
                        View all
                        <MoveRight />
                    </span>
                </div>
                <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4 sm:px-10'>
                    <div className='flex flex-col items-center justify-center bg-gray-200 rounded-xl py-5 gap-y-2'>
                        <img src={SUV} alt="SUV" className="max-h-12" />
                        <span className='text-xl font-semibold'>SUV</span>
                    </div>
                    <div className='flex flex-col items-center justify-center bg-gray-200 rounded-xl py-5 gap-y-2'>
                        <img src={CrossOver} alt="CrossOver" className="max-h-12" />
                        <span className='text-xl font-semibold'>CrossOver</span>
                    </div>
                    <div className='flex flex-col items-center justify-center bg-gray-200 rounded-xl py-5 gap-y-2'>
                        <img src={Wagon} alt="Wagon" className="max-h-12" />
                        <span className='text-xl font-semibold'>Wagon</span>
                    </div>
                    <div className='flex flex-col items-center justify-center bg-gray-200 rounded-xl py-5 gap-y-2'>
                        <img src={MPV} alt="MPV" className="max-h-12" />
                        <span className='text-xl font-semibold'>Family MBP</span>
                    </div>
                    <div className='flex flex-col items-center justify-center bg-gray-200 rounded-xl py-5 gap-y-2'>
                        <img src={Coupe} alt="Coupe" className="max-h-12" />
                        <span className='text-xl font-semibold'>Sport Coupe</span>
                    </div>
                    <div className='flex flex-col items-center justify-center bg-gray-200 rounded-xl py-5 gap-y-2'>
                        <img src={Compact} alt="Compact" className="max-h-12" />
                        <span className='text-xl font-semibold'>Compact</span>
                    </div>
                    <div className='flex flex-col items-center justify-center bg-gray-200 rounded-xl py-5 gap-y-2'>
                        <img src={Coup} alt="Coup" className="max-h-12" />
                        <span className='text-xl font-semibold'>Coup</span>
                    </div>
                    <div className='flex flex-col items-center justify-center bg-gray-200 rounded-xl py-5 gap-y-2'>
                        <img src={PickUp} alt="PickUp" className="max-h-12" />
                        <span className='text-xl font-semibold'>PickUp</span>
                    </div>
                    <div className='flex flex-col items-center justify-center bg-gray-200 rounded-xl py-5 gap-y-2'>
                        <img src={Sedan} alt="Sedan" className="max-h-12" />
                        <span className='text-xl font-semibold'>Sedan</span>
                    </div>
                    <div className='flex flex-col items-center justify-center bg-gray-200 rounded-xl py-5 gap-y-2'>
                        <img src={Limousine} alt="Limousine" className="max-h-12" />
                        <span className='text-xl font-semibold'>Limousine</span>
                    </div>
                    <div className='flex flex-col items-center justify-center bg-gray-200 rounded-xl py-5 gap-y-2'>
                        <img src={Convertible} alt="Convertible" className="max-h-12" />
                        <span className='text-xl font-semibold'>Convertible</span>
                    </div>
                    <div className='flex flex-col items-center justify-center bg-gray-200 rounded-xl py-5 gap-y-2'>
                        <img src={Van} alt="OffRoad" className="max-h-12" />
                        <span className='text-xl font-semibold'>OffRoad</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section;
