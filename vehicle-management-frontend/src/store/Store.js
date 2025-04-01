import { create } from 'zustand';

export const useStore = create((set) => ({
    userData: {},
    setUserData: (value) => set((state) => ({ userData: value !== undefined ? value : state.userData })),
    isUser: true,
    setIsUser: (value) => set((state) => ({ isUser: value !== undefined ? value : state.isUser })),
    isDarkMode: true,
    setIsDarkMode: (value) => set((state) => ({ isDarkMode: value !== undefined ? value : state.isDarkMode })),
    isShopKeeperNavOpen: false,
    setIsShopKeeperNavOpen: (value) => set((state) => ({ isShopKeeperNavOpen: value !== undefined ? value : state.isShopKeeperNavOpen })),
}))