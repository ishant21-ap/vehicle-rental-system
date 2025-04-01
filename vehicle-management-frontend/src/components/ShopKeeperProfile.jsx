import { useEffect, useState } from 'react';
import { useStore } from "../store/Store";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Building2,
    Sun,
    Moon,
    Camera,
    Save
} from "lucide-react";

import axios from 'axios';

const ShopKeeperProfile = () => {
    const { isDarkMode, setIsDarkMode, userData, setUserData } = useStore();
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
        username: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Mechanic Street, Auto City, AC 12345',
        shopName: 'Premium Auto Service',
        experience: '15 years',
        specialization: 'Luxury Vehicles',
    });

    const handleSave = () => {
        setIsEditing(false);
    };

    useEffect(() => {
        const fetchData = async () => {
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

                // ✅ Sync profileData with userData after fetching
                setProfileData({
                    username: response.data.name || '',
                    email: response.data.email || '',
                    phone: response.data.phone || '',
                    address: response.data.address || '',
                    shopName: response.data.shopName || '',
                    
                });

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

        fetchData()
    }, [])

    return (
        <div
            className={`transition-all w-full min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}
        >
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header with Theme Toggle */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Profile Settings</h1>
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={`p-2 rounded-lg transition-colors ${isDarkMode
                                ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400'
                                : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                            }`}
                    >
                        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                </div>

                {/* Profile Card */}
                <div className={`rounded-2xl shadow-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'
                    }`}>
                    {/* Profile Header */}
                    <div className={`relative h-32 ${isDarkMode ? 'bg-gray-700' : 'bg-blue-500'}`}>
                        <div className="absolute -bottom-12 left-8">
                            <div className="relative">
                                <div className={`w-24 h-24 rounded-full border-4 ${isDarkMode ? 'border-gray-800' : 'border-white'
                                    } overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center`}>
                                    <span className="text-2xl font-bold text-white">JD</span>
                                </div>
                                <button
                                    className={`absolute bottom-0 right-0 p-1.5 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                                        } hover:bg-blue-500 hover:text-white transition-colors`}
                                >
                                    <Camera className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="pt-16 p-8">
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Personal Information */}
                            <div className="space-y-4">
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
                                            value={userData.name}
                                            onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
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
                                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
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
                                            onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                            disabled={!isEditing}
                                            className={`bg-transparent w-full focus:outline-none ${!isEditing && 'cursor-default'
                                                }`}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Shop Information */}
                            <div className="space-y-4">
                                <div>
                                    <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                        }`}>
                                        Shop Name
                                    </label>
                                    <div className={`flex items-center gap-3 mt-1 p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                                        }`}>
                                        <Building2 className="w-5 h-5 text-blue-500" />
                                        <input
                                            type="text"
                                            value={userData.shopName}
                                            onChange={(e) => setProfileData({ ...profileData, shopName: e.target.value })}
                                            disabled={!isEditing}
                                            className={`bg-transparent w-full focus:outline-none ${!isEditing && 'cursor-default'
                                                }`}
                                        />
                                    </div>
                                </div>

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
                                            onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                                            disabled={!isEditing}
                                            rows={2}
                                            className={`bg-transparent w-full focus:outline-none resize-none ${!isEditing && 'cursor-default'
                                                }`}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                            }`}>
                                            Experience
                                        </label>
                                        <input
                                            type="text"
                                            value={profileData.experience}
                                            onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
                                            disabled={!isEditing}
                                            className={`mt-1 block w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                                                } focus:outline-none ${!isEditing && 'cursor-default'}`}
                                        />
                                    </div>
                                    <div>
                                        <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                            }`}>
                                            Specialization
                                        </label>
                                        <input
                                            type="text"
                                            value={profileData.specialization}
                                            onChange={(e) => setProfileData({ ...profileData, specialization: e.target.value })}
                                            disabled={!isEditing}
                                            className={`mt-1 block w-full p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                                                } focus:outline-none ${!isEditing && 'cursor-default'}`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopKeeperProfile;