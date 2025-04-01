/* eslint-disable react/prop-types */
import { Menu, User, CarFront, BookUser, LogOut } from "lucide-react";
import { useStore } from "../store/Store";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

const NavItem = ({ Icon, label, isOpen, url }) => {
    const { isDarkMode } = useStore();
    return (
        <NavLink
            to={url}
            end
            className={({ isActive }) =>
                `flex items-center w-full p-3 rounded-lg hover:bg-gray-700/50 transition-all duration-200 ${isActive
                    ? "bg-blue-500/20 text-blue-400"
                    : `text-gray-400 hover:text-${isDarkMode ? 'gray-100' : 'gray-900'}`
                }`
            }
        >
            <div className="flex items-center">
                <Icon className={`w-5 h-5 transition-all duration-200 ${isOpen ? "mr-3" : "mx-auto"}`} />
                <span
                    className={`font-medium transition-all duration-200 ${isOpen
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-5 absolute"
                        }`}
                >
                    {label}
                </span>
            </div>
        </NavLink>
    );
};

const ShopKeeperNavbar = () => {
    const { isShopKeeperNavOpen, setIsShopKeeperNavOpen, isDarkMode } = useStore();

    const handleClick = () => setIsShopKeeperNavOpen(!isShopKeeperNavOpen);

    useEffect(() => {
        document.body.style.backgroundColor = isDarkMode ? "#111827" : "white";
    })

    return (
        <div
            className={`h-screen fixed ${isDarkMode ? 'bg-gray-900' : 'bg-white'
                } flex flex-col justify-between transition-all duration-300 border-r ${isDarkMode ? 'border-gray-800' : 'border-gray-200'
                } ${isShopKeeperNavOpen ? "w-[80px]" : "w-[260px]"
                }`}
        >
            <div className="flex flex-col flex-grow">
                {/* Header */}
                <div className={`p-4 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                    <div className={`flex items-center ${isShopKeeperNavOpen ? "justify-center" : "justify-between"}`}>
                        {!isShopKeeperNavOpen && (
                            <div className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                Dashboard
                            </div>
                        )}
                        <button
                            onClick={handleClick}
                            className={`p-1.5 rounded-lg hover:bg-gray-700/50 transition-colors ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Navigation Items */}
                <div className="flex-grow">
                    <div className="px-3 py-6">
                        <div className={`flex flex-col gap-2 ${isShopKeeperNavOpen ? "items-center" : ""}`}>
                            <NavItem Icon={User} label="Profile" isOpen={!isShopKeeperNavOpen} url="/shopkeeper" />
                            <NavItem Icon={CarFront} label="Vehicles" isOpen={!isShopKeeperNavOpen} url="/shopkeeper/vehicles" />
                            <NavItem Icon={BookUser} label="Bookings" isOpen={!isShopKeeperNavOpen} url="/shopkeeper/bookings" />
                        </div>
                    </div>
                </div>

                {/* User Profile Section */}
                <div className={`p-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                    <div className={`flex items-center ${isShopKeeperNavOpen ? "justify-center" : "gap-3"}`}>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                            <span className="text-sm font-medium text-white">SK</span>
                        </div>
                        {!isShopKeeperNavOpen && (
                            <div className="flex-grow">
                                <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>John Doe</div>
                                <div className="text-xs text-gray-400">Shop Manager</div>
                            </div>
                        )}
                        {!isShopKeeperNavOpen && (
                            <button
                                className="p-1.5 rounded-lg hover:bg-gray-700/50 transition-colors text-gray-400 hover:text-red-400"
                                title="Logout"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopKeeperNavbar;