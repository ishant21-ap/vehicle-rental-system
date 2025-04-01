import React, { useEffect, useState } from 'react';
import { Check, X, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useStore } from '../store/Store';
import axios from 'axios';

const ShopKeeperBooking = () => {
    const { isShopKeeperNavOpen, isDarkMode } = useStore();
    const [bookings, setBooking] = useState([]);

    // Returns a background color class based on booking status.
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-500';
            case 'confirmed':
                return 'bg-green-500';
            case 'cancelled':
                return 'bg-red-500';
            case 'completed':
                return 'bg-blue-500';
            default:
                return 'bg-gray-500';
        }
    };

    // Returns an icon component based on booking status.
    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return <Clock className="w-4 h-4" />;
            case 'confirmed':
                return <CheckCircle className="w-4 h-4" />;
            case 'cancelled':
                return <XCircle className="w-4 h-4" />;
            case 'completed':
                return <Check className="w-4 h-4" />;
            default:
                return null;
        }
    };

    useEffect(() => {
        const fetchBooking = async () => {
            const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
            const fetchedMail = localStorage.getItem("email");

            if (!fetchedMail) {
                console.log("No email found in localStorage");
                return;
            }

            console.log("Fetched email:", fetchedMail);

            // Fetch the shopkeeper user data
            const userResponse = await axios.get(`${VITE_BACKEND_URL}/api/users/${fetchedMail}`);
            console.log("User data:", userResponse.data);

            // Fetch pending bookings for this shopkeeper using the user's id
            const bookingResponse = await axios.get(`${VITE_BACKEND_URL}/api/bookings/pending?shopkeeperId=${userResponse.data.id}`);
            console.log("Booking data:", bookingResponse.data);
            setBooking(bookingResponse.data);
        };

        fetchBooking();
    }, []);

    const acceptBooking = async (booking) => {
        const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
        const fetchedMail = localStorage.getItem("email");

        if (!fetchedMail) {
            console.log("No email found in localStorage");
            return;
        }

        console.log("Fetched email:", fetchedMail);

        // Fetch the shopkeeper user data
        const userResponse = await axios.get(`${VITE_BACKEND_URL}/api/users/${fetchedMail}`);
        console.log("User data:", userResponse.data);

        // Accept the booking
        const bookingResponse = await axios.put(`${VITE_BACKEND_URL}/api/bookings/${booking.id}/status?shopkeeperId=${userResponse.data.id}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            }
        });
        console.log("Booking data:", bookingResponse.data);

        // Fetch pending bookings for this shopkeeper using the user's id
        const newBookingResponse = await axios.get(`${VITE_BACKEND_URL}/api/bookings/pending?shopkeeperId=${userResponse.data.id}`);
        console.log("New Booking data:", newBookingResponse.data);
        setBooking(newBookingResponse.data);

        // Auto refresh the page
        window.location.reload();
        navigator('/shopkeeper/bookings')
    }

    const rejectBooking = async (booking) => {
        const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
        const fetchedMail = localStorage.getItem("email");

        if (!fetchedMail) {
            console.log("No email found in localStorage");
            return;
        }

        console.log("Fetched email:", fetchedMail);

        // Fetch the shopkeeper user data
        const userResponse = await axios.get(`${VITE_BACKEND_URL}/api/users/${fetchedMail}`);
        console.log("User data:", userResponse.data);

        // Reject the booking
        const bookingResponse = await axios.post(`${VITE_BACKEND_URL}/api/bookings/cancel/${booking.id}/${userResponse.data.id}`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            }
        });
        console.log("Booking data:", bookingResponse.data);
        navigator('/shopkeeper/bookings')
    }

    return (
        <div className={`transition-all w-full ${isShopKeeperNavOpen ? 'ml-[80px]' : 'ml-[260px]'} ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <div className="flex flex-col justify-start space-y-3 items-center py-10 w-full px-6 md:px-10 min-h-screen">
                <div className="w-full max-w-6xl">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            Booked Vehicles
                        </h1>
                    </div>
                    <div className={`rounded-lg shadow-xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                                        <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                            Customer Name
                                        </th>
                                        <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                            Customer Phone Number
                                        </th>
                                        <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                            Booking Date
                                        </th>
                                        <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                            End Date
                                        </th>
                                        <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                            Status
                                        </th>
                                        <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                            Accept/Reject
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                                    {bookings.map((booking, index) => (
                                        <tr
                                            key={index}
                                            className={`hover:bg-gray-700/50 transition-colors ${isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'}`}
                                        >
                                            <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                {booking.name ? booking.name : "No Name"}
                                            </td>
                                            <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                {booking.phoneNo ? booking.phoneNo : "No Phone Number"}
                                            </td>
                                            <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                {booking.startDate}
                                            </td>
                                            <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                {booking.endDate}
                                            </td>
                                            <td className={`px-6 py-4 text-sm`}>
                                                <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-white ${getStatusColor(booking.status)}`}>
                                                    {getStatusIcon(booking.status)}
                                                    <span className="ml-2 capitalize">{booking.status}</span>
                                                </span>
                                            </td>
                                            <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => {
                                                            acceptBooking(booking);
                                                        }}
                                                        className="p-1.5 text-green-400 hover:bg-green-400/10 rounded-lg transition-colors"
                                                        title="Accept"
                                                    >
                                                        <Check className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                    onClick={() => {
                                                        rejectBooking(booking);
                                                    }}
                                                        className="p-1.5 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                                        title="Reject"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopKeeperBooking;
