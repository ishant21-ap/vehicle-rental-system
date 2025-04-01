import carPng from "../assets/car.png";
import yellowCar from "../assets/banner-car.png";
import { useStore } from "../store/Store";

const Hero = () => {
    const { isDarkMode } = useStore();

    return (
        <div
            className={`w-full h-auto md:h-[calc(100vh-100px)] grid grid-cols-1 md:grid-cols-2 ${isDarkMode ? "bg-black" : "bg-[#F6F8ED]"
                } px-4 md:px-20`}
        >
            {/* Left Section */}
            <div
                className={`flex flex-col items-start justify-center p-8 md:p-12 gap-y-5 ${isDarkMode ? "text-white" : "text-black"
                    }`}
            >
                <div className="text-3xl md:text-4xl font-bold text-amber-300">
                    Effortless
                </div>
                <div className="text-4xl md:text-6xl font-bold">Vehicle Rental</div>
                <div className="text-base md:text-2xl">
                    Experience the convenience of renting a vehicle with us. Choose
                    from a wide range of cars to suit your needs and enjoy a seamless
                    rental process.
                </div>
                <button className="bg-amber-300 text-black py-2 px-4 text-base md:text-xl rounded-2xl">
                    Book Now
                </button>
            </div>

            {/* Right Section */}
            <div className="flex items-center justify-center p-4">
                <img
                    src={isDarkMode ? carPng : yellowCar}
                    alt="car"
                    className="max-w-full h-auto"
                />
            </div>
        </div>
    );
};

export default Hero;
