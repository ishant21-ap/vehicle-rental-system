import { useEffect, useState } from 'react';
import { useStore } from '../store/Store';
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Sun,
    Moon,
    Camera,
    Save,
    Clock,
    Car,
    CheckCircle2,
    AlertCircle,
    XCircle
} from "lucide-react";
import axios from 'axios';

// Mock booking data
const mockBookings = [
    {
        id: "BK001",
        vehicleName: "Toyota Camry",
        vehicleNumber: "ABC 123",
        bookingDate: "2025-04-15",
        startTime: "09:00 AM",
        endTime: "05:00 PM",
        status: "Completed",
        price: "$45.00"
    },
    {
        id: "BK002",
        vehicleName: "Honda CR-V",
        vehicleNumber: "XYZ 789",
        bookingDate: "2025-04-20",
        startTime: "10:00 AM",
        endTime: "06:00 PM",
        status: "Active",
        price: "$55.00"
    },
    {
        id: "BK003",
        vehicleName: "Ford Transit",
        vehicleNumber: "DEF 456",
        bookingDate: "2025-04-25",
        startTime: "08:00 AM",
        endTime: "04:00 PM",
        status: "Cancelled",
        price: "$40.00"
    }
];

const UserProfile = () => {
    const { isDarkMode, setIsDarkMode } = useStore();
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('profile'); // 'profile' or 'bookings'
    const [bookings, setBookings] = useState([]);

    const [userData, setUserData] = useState({
        name: "Ishant Rathi",
        username: "ishant11",
        email: "ishantrathi031@gmail.com",
        phone: "9876553210",
        password: "abc",
        address: "123 Elm Street, Springfield",
        role: "USER",
        dob: "1995-08-15",
        profileImageUrl: "",
        gender: "Male"
    });

    const handleSave = () => {
        setIsEditing(false);
        // Here you would typically save the data to your backend
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return 'bg-green-500';
            case 'active':
                return 'bg-blue-500';
            case 'cancelled':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'completed':
                return <CheckCircle2 className="w-4 h-4" />;
            case 'active':
                return <Clock className="w-4 h-4" />;
            case 'cancelled':
                return <XCircle className="w-4 h-4" />;
            default:
                return <AlertCircle className="w-4 h-4" />;
        }
    };

    // Get initials for avatar
    const getInitials = () => {
        return userData.name
            .split(' ')
            .map(name => name[0])
            .join('')
            .toUpperCase();
    };


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
                    const fetchedMail = localStorage.getItem("email");
    
                    if (!fetchedMail) {
                        console.log("No email found in localStorage");
                        return;
                    }
    
                    console.log(fetchedMail)
    
                    const response = await axios.get(`${VITE_BACKEND_URL}/api/users/${fetchedMail}`);
                    setUserData(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        const fetchBooking = async () => {
            const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
            const fetchedMail = localStorage.getItem("email");

            if (!fetchedMail) {
                console.log("No email found in localStorage");
                return;
            }

            console.log(fetchedMail);

            const user = await axios.get(`${VITE_BACKEND_URL}/api/users/${fetchedMail}`);
            setUserData(user.data);

            console.log(user.data.id);
            

            const response = await axios.get(`${VITE_BACKEND_URL}/api/bookings/my?userId=1`);
            console.log(response.data);
            setUserData(prevState => ({
                ...prevState,
                bookings: response.data
            }));
            setBookings(response.data);
        }
        fetchUser()
        fetchBooking()
    }, []) 

    return (
        <div className={`min-h-screen w-full ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Header with Theme Toggle */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">My Account</h1>
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={`p-2 rounded-lg transition-colors ${isDarkMode
                                ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400'
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                            }`}
                        aria-label="Toggle theme"
                    >
                        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b mb-8 gap-1">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`px-6 py-3 font-medium transition-colors ${activeTab === 'profile'
                                ? isDarkMode
                                    ? 'border-b-2 border-blue-400 text-blue-400'
                                    : 'border-b-2 border-blue-500 text-blue-600'
                                : isDarkMode
                                    ? 'text-gray-400 hover:text-gray-200'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Profile
                    </button>
                    <button
                        onClick={() => setActiveTab('bookings')}
                        className={`px-6 py-3 font-medium transition-colors ${activeTab === 'bookings'
                                ? isDarkMode
                                    ? 'border-b-2 border-blue-400 text-blue-400'
                                    : 'border-b-2 border-blue-500 text-blue-600'
                                : isDarkMode
                                    ? 'text-gray-400 hover:text-gray-200'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        My Bookings
                    </button>
                </div>

                {activeTab === 'profile' ? (
                    /* Profile Card */
                    <div className={`rounded-2xl shadow-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'
                        }`}>
                        {/* Profile Header */}
                        <div className={`relative h-48 ${isDarkMode ? 'bg-gradient-to-r from-blue-900 to-purple-900' : 'bg-gradient-to-r from-blue-500 to-purple-500'}`}>
                            <div className="absolute -bottom-16 left-8">
                                <div className="relative">
                                    <div className={`w-32 h-32 rounded-full border-4 ${isDarkMode ? 'border-gray-800' : 'border-white'
                                        } overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center`}>
                                        {userData.profileImageUrl ? (
                                            <img
                                                src={userData.profileImageUrl}
                                                alt={userData.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-3xl font-bold text-white">{getInitials()}</span>
                                        )}
                                    </div>
                                    <button
                                        className={`absolute bottom-0 right-0 p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                                            } hover:bg-blue-500 hover:text-white transition-colors`}
                                    >
                                        <Camera className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Profile Content */}
                        <div className="pt-20 p-8">
                            <div className="flex justify-end mb-6">
                                <button
                                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isDarkMode
                                            ? 'bg-blue-500 hover:bg-blue-600 text-white'
                                            : 'bg-blue-500 hover:bg-blue-600 text-white'
                                        }`}
                                >
                                    {isEditing ? (
                                        <>
                                            <Save className="w-4 h-4" />
                                            Save Changes
                                        </>
                                    ) : (
                                        'Edit Profile'
                                    )}
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Personal Information */}
                                <div className="space-y-6">
                                    <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                        Personal Information
                                    </h2>

                                    <div>
                                        <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                            }`}>
                                            Full Name
                                        </label>
                                        <div className={`flex items-center gap-3 mt-1 p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                                            }`}>
                                            <User className="w-5 h-5 text-blue-500" />
                                            <input
                                                type="text"
                                                value={userData.name}
                                                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                                disabled={!isEditing}
                                                className={`bg-transparent w-full focus:outline-none ${!isEditing && 'cursor-default'
                                                    }`}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                            }`}>
                                            Username
                                        </label>
                                        <div className={`flex items-center gap-3 mt-1 p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                                            }`}>
                                            <User className="w-5 h-5 text-blue-500" />
                                            <input
                                                type="text"
                                                value={userData.username}
                                                onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                                                disabled={!isEditing}
                                                className={`bg-transparent w-full focus:outline-none ${!isEditing && 'cursor-default'
                                                    }`}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                            }`}>
                                            Email
                                        </label>
                                        <div className={`flex items-center gap-3 mt-1 p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                                            }`}>
                                            <Mail className="w-5 h-5 text-blue-500" />
                                            <input
                                                type="email"
                                                value={userData.email}
                                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                                disabled={!isEditing}
                                                className={`bg-transparent w-full focus:outline-none ${!isEditing && 'cursor-default'
                                                    }`}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                            }`}>
                                            Phone
                                        </label>
                                        <div className={`flex items-center gap-3 mt-1 p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                                            }`}>
                                            <Phone className="w-5 h-5 text-blue-500" />
                                            <input
                                                type="tel"
                                                value={userData.phone}
                                                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                                disabled={!isEditing}
                                                className={`bg-transparent w-full focus:outline-none ${!isEditing && 'cursor-default'
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Information */}
                                <div className="space-y-6">
                                    <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                        Additional Information
                                    </h2>

                                    <div>
                                        <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                            }`}>
                                            Address
                                        </label>
                                        <div className={`flex items-center gap-3 mt-1 p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                                            }`}>
                                            <MapPin className="w-5 h-5 text-blue-500" />
                                            <textarea
                                                value={userData.address}
                                                onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                                                disabled={!isEditing}
                                                rows={2}
                                                className={`bg-transparent w-full focus:outline-none resize-none ${!isEditing && 'cursor-default'
                                                    }`}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                            }`}>
                                            Date of Birth
                                        </label>
                                        <div className={`flex items-center gap-3 mt-1 p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                                            }`}>
                                            <Calendar className="w-5 h-5 text-blue-500" />
                                            <input
                                                type="date"
                                                value={userData.dob}
                                                onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
                                                disabled={!isEditing}
                                                className={`bg-transparent w-full focus:outline-none ${!isEditing && 'cursor-default'
                                                    }`}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                                }`}>
                                                Gender
                                            </label>
                                            <select
                                                value={userData.gender}
                                                onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                                                disabled={!isEditing}
                                                className={`mt-1 block w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'
                                                    } focus:outline-none ${!isEditing && 'cursor-default'}`}
                                            >
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                                <option value="Prefer not to say">Prefer not to say</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                                }`}>
                                                Role
                                            </label>
                                            <input
                                                type="text"
                                                value={userData.role}
                                                disabled
                                                className={`mt-1 block w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                                                    } focus:outline-none cursor-default`}
                                            />
                                        </div>
                                    </div>

                                    {isEditing && (
                                        <div>
                                            <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                                }`}>
                                                Password
                                            </label>
                                            <div className={`flex items-center gap-3 mt-1 p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                                                }`}>
                                                <input
                                                    type="password"
                                                    placeholder="Enter new password"
                                                    className="bg-transparent w-full focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Bookings Section */
                    <div className={`rounded-2xl shadow-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'
                        }`}>
                        <div className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <Car className="w-6 h-6 text-blue-500" />
                                <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                                    My Bookings
                                </h2>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                                            <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                                }`}>Booking ID</th>
                                            <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                                }`}>Vehicle</th>
                                            <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                                }`}>Date</th>
                                            <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                                }`}>Time</th>
                                            <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                                }`}>Price</th>
                                            <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                                }`}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                                        {bookings.map((booking) => (
                                            <tr
                                                key={booking.id}
                                                className={`hover:bg-gray-700/10 transition-colors ${isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
                                                    }`}
                                            >
                                                <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                                    }`}>{booking.id}</td>
                                                <td className={`px-6 py-4 ${isDarkMode ? 'text-white' : 'text-gray-900'
                                                    }`}>
                                                    <div>
                                                        <div className="font-medium">{booking.vehicleName}</div>
                                                        <div className="text-sm text-gray-500">{booking.vehicleNumber}</div>
                                                    </div>
                                                </td>
                                                <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                                    }`}>{booking.startDate}</td>
                                                <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                                    }`}>{booking.endDate}</td>
                                                <td className={`px-6 py-4 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                                    }`}>{booking.totalPrice}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)} bg-opacity-20 text-white`}>
                                                            {getStatusIcon(booking.status)}
                                                            {booking.status}
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {mockBookings.length === 0 && (
                                <div className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                    <Car className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                    <p>You don&lsquo;t have any bookings yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;