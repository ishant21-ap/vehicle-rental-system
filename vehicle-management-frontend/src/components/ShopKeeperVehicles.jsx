/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useStore } from '../store/Store';
import { Car, AlertCircle, CheckCircle2, Clock, Plus, Pencil, Trash2, Upload, X, Image as ImageIcon } from 'lucide-react';
import axios from 'axios';

// Mock data for demonstration
const initialVehicles = [
    {
        id: 'VH001',
        name: 'Toyota Camry',
        brand: 'Toyota',
        model: '2024 Camry XSE',
        number: 'ABC 123',
        type: 'Sedan',
        price: 45.00,
        description: 'Comfortable sedan with excellent fuel economy',
        category: 'Economy',
        status: 'Available',
        images: ['https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80']
    },
    {
        id: 'VH002',
        name: 'Honda CR-V',
        brand: 'Honda',
        model: '2023 CR-V Touring',
        number: 'XYZ 789',
        type: 'SUV',
        price: 65.00,
        description: 'Spacious SUV perfect for family trips',
        category: 'Family',
        status: 'In Service',
        images: ['https://images.unsplash.com/photo-1568844293986-ca4c357d2006?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80']
    },
    {
        id: 'VH003',
        name: 'Ford Transit',
        brand: 'Ford',
        model: '2022 Transit 350',
        number: 'DEF 456',
        type: 'Van',
        price: 85.00,
        description: 'Large capacity van for moving or transportation',
        category: 'Commercial',
        status: 'Busy',
        images: ['https://images.unsplash.com/photo-1566633806327-68e152aaf26d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80']
    }
];

// Vehicle categories
const vehicleCategories = [
    'Economy',
    'Luxury',
    'Family',
    'Sports',
    'Off-road',
    'Commercial',
    'Electric'
];

const ShopKeeperVehicles = () => {
    const { isShopKeeperNavOpen, isDarkMode } = useStore();
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        model: '',
        number: '',
        type: 'Sedan',
        price: '',
        description: '',
        category: 'Economy',
        status: 'Available',
        images: []
    });
    const [imageUrls, setImageUrls] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);

    const jwtToken = localStorage.getItem('jwtToken');

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'available':
                return 'bg-green-500';
            case 'in service':
                return 'bg-yellow-500';
            case 'busy':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'available':
                return <CheckCircle2 className="w-4 h-4" />;
            case 'in service':
                return <Clock className="w-4 h-4" />;
            case 'busy':
                return <AlertCircle className="w-4 h-4" />;
            default:
                return null;
        }
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this vehicle?')) {
            setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
        }
    };

    const handleEdit = (vehicle) => {
        setSelectedVehicle(vehicle);
        setFormData({
            name: vehicle.name || '',
            brand: vehicle.brand || '',
            model: vehicle.model || '',
            number: vehicle.number || '',
            type: vehicle.type || 'Sedan',
            price: vehicle.price ? vehicle.price.toString() : '',
            description: vehicle.description || '',
            category: vehicle.category || 'Economy',
            status: vehicle.status || 'Available',
            images: []
        });
        setImageUrls(vehicle.images || []);
        setModalMode('edit');
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setSelectedVehicle(null);
        setFormData({
            name: '',
            brand: '',
            model: '',
            number: '',
            type: 'Sedan',
            price: '',
            description: '',
            category: 'Economy',
            status: 'Available',
            images: []
        });
        setImageUrls([]);
        setImagePreview(null);
        setModalMode('add');
        setIsModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        // Create URL previews for the selected files
        const newImageUrls = files.map(file => URL.createObjectURL(file));

        // In a real app, you would upload these files to a server
        // For this demo, we'll just store the URLs
        setImageUrls([...imageUrls, ...newImageUrls]);

        // Reset the file input
        e.target.value = null;
    };

    const removeImage = (index) => {
        const updatedUrls = [...imageUrls];
        updatedUrls.splice(index, 1);
        setImageUrls(updatedUrls);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newVehicle = {
            id: selectedVehicle ? selectedVehicle.id : `VH${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
            name: formData.name,
            brand: formData.brand,
            model: formData.model,
            number: formData.number,
            type: formData.type,
            price: parseFloat(formData.price),
            description: formData.description,
            category: formData.category,
            status: formData.status,
            images: imageUrls
        };

        if (modalMode === 'add') {
            try {
                setVehicles([...vehicles, newVehicle]);
                const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
                const response = axios.post(`${VITE_BACKEND_URL}/api/vehicles`, newVehicle,{}, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`
                    }
                });
                if (response.status === 201) {
                    console.log('Vehicle added successfully');
                } else {
                    console.log('Failed to add vehicle');
                }
            } catch (error) {
                console.log('Failed to add vehicle', error.message);
            }
        } else {
            setVehicles(vehicles.map(vehicle =>
                vehicle.id === selectedVehicle.id ? newVehicle : vehicle
            ));
        }

        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchCars = async () => {
            const jwtToken = localStorage.getItem("jwtToken");  
    
            if (!jwtToken) {
                console.error("JWT token is missing. Please log in.");
                return;
            }
    
            try {
                const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
                const response = await axios.get(`${VITE_BACKEND_URL}/api/vehicles/shopkeeper`, {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                });
    
                console.log("Fetched vehicles:", response.data);  // ✅ Debugging
    
                if (response.status === 200) {
                    setVehicles(response.data);
                } else {
                    console.log("Failed to fetch vehicles");
                }
            } catch (error) {
                console.error("Error fetching vehicles:", error.response?.data || error.message);
            }
        };
    
        fetchCars();
    }, []);
    
    

    return (
        <div
            className={`transition-all w-full ${isShopKeeperNavOpen ? 'ml-[80px]' : 'ml-[260px]'
                } ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
        >
            <div className='flex flex-col justify-start space-y-3 items-center py-10 w-full px-6 md:px-10 min-h-screen'>
                <div className="w-full max-w-6xl">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <Car className="w-8 h-8 text-blue-500" />
                            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Your Vehicles List
                            </h1>
                        </div>
                        <button
                            onClick={handleAdd}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                            Add Vehicle
                        </button>
                    </div>

                    <div className={`rounded-lg shadow-xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'
                        }`}>
                        <div className="overflow-x-auto">
                            <table className='w-full border-collapse'>
                                <thead>
                                    <tr className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                                        <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                            }`}>Vehicle ID</th>
                                        <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                            }`}>Vehicle</th>
                                        <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                            }`}>Details</th>
                                        <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                            }`}>Price</th>
                                        <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                            }`}>Status</th>
                                        <th className={`px-6 py-4 text-left text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                            }`}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                                    {vehicles.length > 0 ? (
                                        vehicles.map((vehicle) => (
                                            <tr
                                                key={vehicle.id}
                                                className={`hover:bg-gray-700/50 transition-colors ${isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
                                                    }`}
                                            >
                                                <td className={`px-6 py-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                                    }`}>{vehicle.id}</td>
                                                <td className={`px-6 py-4 ${isDarkMode ? 'text-white' : 'text-gray-900'
                                                    }`}>
                                                    <div className="flex items-center gap-3">
                                                        {vehicle.images && vehicle.images.length > 0 ? (
                                                            <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                                                                <img
                                                                    src={vehicle.images[0]}
                                                                    alt={vehicle.name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className={`w-12 h-12 rounded-md flex items-center justify-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                                                                }`}>
                                                                <Car className="w-6 h-6 text-gray-400" />
                                                            </div>
                                                        )}
                                                        <div>
                                                            <div className="font-medium">{vehicle.name}</div>
                                                            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                                                }`}>{vehicle.brand} {vehicle.model}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className={`px-6 py-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'
                                                    }`}>
                                                    <div>
                                                        <div className="text-sm">Number: {vehicle.number}</div>
                                                        <div className="text-sm">Type: {vehicle.type}</div>
                                                        <div className="text-sm">Category: {vehicle.category}</div>
                                                    </div>
                                                </td>
                                                <td className={`px-6 py-4 text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'
                                                    }`}>${vehicle.price.toFixed(2)}/day</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)} bg-opacity-20 text-white`}>
                                                            {getStatusIcon(vehicle.status)}
                                                            {vehicle.status}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => handleEdit(vehicle)}
                                                            className="p-1.5 text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors"
                                                            title="Edit"
                                                        >
                                                            <Pencil className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(vehicle.id)}
                                                            className="p-1.5 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className={`px-6 py-4 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                                No Car available....
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for Add/Edit */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <div className={`p-6 rounded-lg w-full max-w-3xl pt-55 ${isDarkMode ? 'bg-gray-800' : 'bg-white'
                        }`}>
                        <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                            {modalMode === 'add' ? 'Add New Vehicle' : 'Edit Vehicle'}
                        </h2>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Basic Information */}
                            <div>
                                <h3 className={`text-md font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                    }`}>Basic Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                            }`}>
                                            Vehicle Name*
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:border-blue-500 ${isDarkMode
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                                }`}
                                            placeholder="e.g. Toyota Camry"
                                        />
                                    </div>
                                    <div>
                                        <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                            }`}>
                                            Vehicle Number*
                                        </label>
                                        <input
                                            type="text"
                                            name="number"
                                            value={formData.number}
                                            onChange={handleInputChange}
                                            required
                                            className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:border-blue-500 ${isDarkMode
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                                }`}
                                            placeholder="e.g. ABC 123"
                                        />
                                    </div>
                                    <div>
                                        <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                            }`}>
                                            Brand*
                                        </label>
                                        <input
                                            type="text"
                                            name="brand"
                                            value={formData.brand}
                                            onChange={handleInputChange}
                                            required
                                            className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:border-blue-500 ${isDarkMode
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                                }`}
                                            placeholder="e.g. Toyota"
                                        />
                                    </div>
                                    <div>
                                        <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                            }`}>
                                            Model*
                                        </label>
                                        <input
                                            type="text"
                                            name="model"
                                            value={formData.model}
                                            onChange={handleInputChange}
                                            required
                                            className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:border-blue-500 ${isDarkMode
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                                }`}
                                            placeholder="e.g. 2024 Camry XSE"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Vehicle Details */}
                            <div>
                                <h3 className={`text-md font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                    }`}>Vehicle Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                            }`}>
                                            Vehicle Type
                                        </label>
                                        <select
                                            name="type"
                                            value={formData.type}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:border-blue-500 ${isDarkMode
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                                }`}
                                        >
                                            <option value="Sedan">Sedan</option>
                                            <option value="SUV">SUV</option>
                                            <option value="Van">Van</option>
                                            <option value="Truck">Truck</option>
                                            <option value="Hatchback">Hatchback</option>
                                            <option value="Convertible">Convertible</option>
                                            <option value="Coupe">Coupe</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                            }`}>
                                            Category
                                        </label>
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:border-blue-500 ${isDarkMode
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                                }`}
                                        >
                                            {vehicleCategories.map(category => (
                                                <option key={category} value={category}>{category}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                            }`}>
                                            Status
                                        </label>
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleInputChange}
                                            className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:border-blue-500 ${isDarkMode
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                                }`}
                                        >
                                            <option value="Available">Available</option>
                                            <option value="In Service">In Service</option>
                                            <option value="Busy">Busy</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Price and Description */}
                            <div>
                                <h3 className={`text-md font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                    }`}>Pricing & Description</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                            }`}>
                                            Price per Day ($)*
                                        </label>
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            required
                                            min="0"
                                            step="0.01"
                                            className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:border-blue-500 ${isDarkMode
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                                }`}
                                            placeholder="e.g. 45.00"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                            }`}>
                                            Description
                                        </label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            rows={3}
                                            className={`w-full px-3 py-2 rounded-lg border focus:outline-none focus:border-blue-500 ${isDarkMode
                                                ? 'bg-gray-700 border-gray-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-900'
                                                }`}
                                            placeholder="Describe the vehicle features, condition, etc."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Vehicle Images */}
                            <div>
                                <h3 className={`text-md font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                    }`}>Vehicle Images</h3>

                                {/* Image Upload */}
                                <div className={`border-2 border-dashed rounded-lg p-4 text-center ${isDarkMode
                                    ? 'border-gray-600 bg-gray-700/30'
                                    : 'border-gray-300 bg-gray-50'
                                    }`}>
                                    <input
                                        type="file"
                                        id="image-upload"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="image-upload"
                                        className="cursor-pointer block"
                                    >
                                        <div className="flex flex-col items-center justify-center py-4">
                                            <Upload className={`w-10 h-10 mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                                }`} />
                                            <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                                }`}>
                                                Click to upload images
                                            </p>
                                            <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                                }`}>
                                                PNG, JPG, GIF up to 10MB
                                            </p>
                                        </div>
                                    </label>
                                </div>

                                {/* Image Previews */}
                                {imageUrls.length > 0 && (
                                    <div className="mt-4">
                                        <h4 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                            }`}>
                                            Uploaded Images ({imageUrls.length})
                                        </h4>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                            {imageUrls.map((url, index) => (
                                                <div
                                                    key={index}
                                                    className={`relative rounded-lg overflow-hidden border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'
                                                        }`}
                                                >
                                                    <img
                                                        src={url}
                                                        alt={`Vehicle image ${index + 1}`}
                                                        className="w-full h-24 object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(index)}
                                                        className="absolute top-1 right-1 p-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Form Actions */}
                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className={`px-4 py-2 rounded-lg transition-colors ${isDarkMode
                                        ? 'text-gray-300 hover:bg-gray-700'
                                        : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    {modalMode === 'add' ? 'Add Vehicle' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShopKeeperVehicles;