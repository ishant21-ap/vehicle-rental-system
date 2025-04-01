/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Car, DollarSign, Tag, Info, Calendar, X, Check } from 'lucide-react';
import { useStore } from '../store/Store';
import axios from 'axios'

const CarDescription = () => {
    // Retrieve the car data passed via the route state
    const { state } = useLocation();
    const { carData } = state || {};
    const { isDarkMode, userData, setUserData } = useStore();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [bookingData, setBookingData] = useState({
        startDate: '',
        endDate: '',
        name: '',
        phoneNo: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === carData.imageUrls.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? carData.imageUrls.length - 1 : prevIndex - 1
        );
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookingData({
            ...bookingData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
    
        const startDate = bookingData.startDate;
        const endDate = bookingData.endDate;
        const name = bookingData.name;
        const phoneNumber = bookingData.phoneNo;
    
        try {
            const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
            const fetchedMail = localStorage.getItem("email");
            const jwtToken = localStorage.getItem("jwtToken");
    
            if (!fetchedMail) {
                console.log("No email found in localStorage");
                return;
            }
    
            console.log(fetchedMail);
    
            // Fetch user data
            const fetchedData = await axios.get(`${VITE_BACKEND_URL}/api/users/${fetchedMail}`);
            const userId = fetchedData.data.id;
    
            console.log(jwtToken);
            // Booking request
            const response = await axios.post(
                `${VITE_BACKEND_URL}/api/bookings?userId=${userId}&vehicleId=${carData.id}&startDate=${startDate}&endDate=${endDate}&name=${name}&phoneNo=${phoneNumber}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                }
            );

            setBookingSuccess(true)
    
            console.log(response);
        } catch (error) {
            console.log("Error Occurred", error.message);
        }
    
        // setBookingSuccess(true);
    };
    

    // Calculate minimum end date (must be at least the start date)
    const getMinEndDate = () => {
        return bookingData.startDate || new Date().toISOString().split('T')[0];
    };

    // Calculate minimum start date (today)
    const getMinStartDate = () => {
        return new Date().toISOString().split('T')[0];
    };

    // Calculate rental duration in days
    const calculateDuration = () => {
        if (!bookingData.startDate || !bookingData.endDate) return 0;
        
        const start = new Date(bookingData.startDate);
        const end = new Date(bookingData.endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return diffDays;
    };

    // Calculate total price
    const calculateTotalPrice = () => {
        const days = calculateDuration();
        return days * carData.price;
    };

    // In case no car data is available
    if (!carData) {
        return <div>No car data available.</div>;
    }

    return (
        <div
            className={`${isDarkMode ? "bg-gray-900" : "bg-gray-100"} min-h-screen flex items-center justify-center p-4 transition-all duration-300`}
        >
            <div
                className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-xl shadow-2xl overflow-hidden w-full max-w-6xl h-screen flex flex-col md:flex-row transition-all duration-300`}
            >
                {/* Image Slider Section */}
                <div className="relative w-full md:w-3/5 h-1/2 md:h-full bg-gray-900">
                    <img
                        src={carData.imageUrls[currentImageIndex]}
                        alt={`${carData.brand} ${carData.name} - View ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                    />

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                        aria-label="Previous image"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-800" />
                    </button>

                    <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                        aria-label="Next image"
                    >
                        <ChevronRight className="w-6 h-6 text-gray-800" />
                    </button>

                    {/* Image Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                        {carData.imageUrls.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentImageIndex(index)}
                                className={`w-3 h-3 rounded-full transition-all ${index === currentImageIndex ? 'bg-white scale-110' : 'bg-white/50'
                                    }`}
                                aria-label={`Go to image ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Car Details Section */}
                <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col h-1/2 md:h-full overflow-y-auto">
                    <div className="mb-6">
                        <h1 className={`text-3xl md:text-4xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            {carData.name}
                        </h1>
                        <div className={`flex items-center mt-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                            <span className="text-xl">{carData.brand} {carData.model}</span>
                        </div>
                    </div>

                    <div className={`${isDarkMode ? "bg-gray-700" : "bg-gray-100"} flex items-center mb-6 p-4 rounded-lg transition-all duration-300`}>
                        <DollarSign className="w-6 h-6 text-green-600 mr-2" />
                        <div>
                            <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>Price</p>
                            <p className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                ${carData.price.toLocaleString()}/day
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className={`${isDarkMode ? "bg-gray-700" : "bg-gray-100"} flex items-center p-4 rounded-lg transition-all duration-300`}>
                            <Car className="w-5 h-5 text-blue-600 mr-2" />
                            <div>
                                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>Brand</p>
                                <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>{carData.brand}</p>
                            </div>
                        </div>

                        <div className={`${isDarkMode ? "bg-gray-700" : "bg-gray-100"} flex items-center p-4 rounded-lg transition-all duration-300`}>
                            <Tag className="w-5 h-5 text-purple-600 mr-2" />
                            <div>
                                <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-500"}`}>Category</p>
                                <p className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>{carData.category}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
                        <div className="flex items-center mb-2">
                            <Info className="w-5 h-5 text-gray-700 mr-2" />
                            <h2 className={`text-xl font-semibold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Description</h2>
                        </div>
                        <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} leading-relaxed`}>
                            {carData.description}
                        </p>
                    </div>

                    <div className="mt-auto">
                        <button 
                            onClick={() => setShowBookingForm(true)}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors shadow-md"
                        >
                            Rent Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Booking Form Modal */}
            {showBookingForm && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div 
                        className={`${isDarkMode ? "bg-gray-800" : "bg-white"} rounded-xl shadow-xl w-full max-w-md p-6 relative`}
                    >
                        {/* Close button */}
                        <button 
                            onClick={() => setShowBookingForm(false)}
                            className={`absolute top-4 right-4 p-1 rounded-full ${
                                isDarkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            } transition-colors`}
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {bookingSuccess ? (
                            <div className="text-center py-8">
                                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                    <Check className="w-8 h-8 text-green-600" />
                                </div>
                                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Booking Successful!</h3>
                                <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                                    Your booking for {carData.name} has been confirmed.
                                </p>
                            </div>
                        ) : (
                            <>
                                <h2 className={`text-xl font-bold mb-6 pr-8 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                    Book {carData.brand} {carData.name}
                                </h2>
                                
                                <form onSubmit={handleSubmit} className="space-y-4">

                                <div>
                                        <label 
                                            htmlFor="name" 
                                            className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                                        >
                                            Full Name*
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={bookingData.name}
                                            onChange={handleInputChange}
                                            required
                                            className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                                                isDarkMode 
                                                    ? "bg-gray-700 border-gray-600 text-white" 
                                                    : "bg-white border-gray-300 text-gray-900"
                                            }`}
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div>
  <label 
    htmlFor="phone" 
    className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
  >
    Phone Number*
  </label>
  <input
    type="tel"
    id="phone"
    name="phoneNo"  // Updated this line from "phone" to "phoneNo"
    value={bookingData.phoneNo}
    onChange={handleInputChange}
    required
    className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none ${
      isDarkMode 
        ? "bg-gray-700 border-gray-600 text-white" 
        : "bg-white border-gray-300 text-gray-900"
    }`}
    placeholder="+1 (555) 123-4567"
  />
</div>

                                    <div>
                                        <label 
                                            htmlFor="startDate" 
                                            className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                                        >
                                            Start Date*
                                        </label>
                                        <div className={`relative flex items-center`}>
                                            <Calendar className={`absolute left-3 w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                                            <input
                                                type="date"
                                                id="startDate"
                                                name="startDate"
                                                value={bookingData.startDate}
                                                onChange={handleInputChange}
                                                min={getMinStartDate()}
                                                required
                                                className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                                                    isDarkMode 
                                                        ? "bg-gray-700 border-gray-600 text-white" 
                                                        : "bg-white border-gray-300 text-gray-900"
                                                }`}
                                            />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label 
                                            htmlFor="endDate" 
                                            className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                                        >
                                            End Date*
                                        </label>
                                        <div className={`relative flex items-center`}>
                                            <Calendar className={`absolute left-3 w-5 h-5 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`} />
                                            <input
                                                type="date"
                                                id="endDate"
                                                name="endDate"
                                                value={bookingData.endDate}
                                                onChange={handleInputChange}
                                                min={getMinEndDate()}
                                                required
                                                className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                                                    isDarkMode 
                                                        ? "bg-gray-700 border-gray-600 text-white" 
                                                        : "bg-white border-gray-300 text-gray-900"
                                                }`}
                                            />
                                        </div>
                                    </div>

                                    {/*<div>
                                        <label 
                                            htmlFor="email" 
                                            className={`block text-sm font-medium mb-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                                        >
                                            Email*
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={bookingData.email}
                                            onChange={handleInputChange}
                                            required
                                            className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                                                isDarkMode 
                                                    ? "bg-gray-700 border-gray-600 text-white" 
                                                    : "bg-white border-gray-300 text-gray-900"
                                            }`}
                                            placeholder="john@example.com"
                                        />
                                    </div> */}

                                    {/* Booking Summary */}
                                    {bookingData.startDate && bookingData.endDate && (
                                        <div className={`${isDarkMode ? "bg-gray-700" : "bg-blue-50"} p-4 rounded-lg mt-4`}>
                                            <h3 className={`font-medium mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Booking Summary</h3>
                                            <div className="space-y-1">
                                                <div className="flex justify-between">
                                                    <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>Duration:</span>
                                                    <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>{calculateDuration()} days</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>Daily Rate:</span>
                                                    <span className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>${carData.price.toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between pt-2 border-t border-gray-600">
                                                    <span className={`font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Total:</span>
                                                    <span className={`font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>${calculateTotalPrice().toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full py-3 px-6 rounded-lg font-medium transition-colors shadow-md mt-4 ${
                                            isSubmitting 
                                                ? "bg-gray-400 cursor-not-allowed" 
                                                : "bg-blue-600 hover:bg-blue-700 text-white"
                                        }`}
                                    >
                                        {isSubmitting ? "Processing..." : "Confirm Booking"}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CarDescription;